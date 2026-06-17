document.addEventListener('DOMContentLoaded', () => {
  const newsContainer = document.getElementById('news-container');
  const footer = document.querySelector('.custom-footer');
  const fallbackImage = 'logo.png';

  function createLoadingAnimation() {
    const loadingDiv = document.querySelector('.loading');
    const text = 'LOADING';
    loadingDiv.innerHTML = '';

    text.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.animationDelay = `${index * 0.2}s`;
      loadingDiv.appendChild(span);
    });
  }

  function stripHtml(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html || '';
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  function decodeHtmlEntities(html) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html || '';
    return textarea.value;
  }

  function getFeaturedImageFromPost(post) {
    if (post.jetpack_featured_media_url) {
      return post.jetpack_featured_media_url;
    }

    const embeddedMedia = post._embedded?.['wp:featuredmedia']?.[0];
    if (!embeddedMedia) {
      return fallbackImage;
    }

    if (embeddedMedia.media_details?.sizes) {
      const sizes = embeddedMedia.media_details.sizes;
      const preferredSizes = ['large', 'medium_large', 'medium', 'full', 'thumbnail'];
      for (const size of preferredSizes) {
        if (sizes[size]?.source_url) {
          return sizes[size].source_url;
        }
      }
    }

    if (embeddedMedia.source_url) {
      return embeddedMedia.source_url;
    }

    return fallbackImage;
  }

  function buildNewsCard(item) {
    const newsElement = document.createElement('div');
    newsElement.className = 'news-item';

    const img = document.createElement('img');
    img.className = 'news-image';
    img.src = item.imgSrc || fallbackImage;
    img.alt = item.title;
    img.addEventListener('error', () => {
      img.src = fallbackImage;
    });

    const content = document.createElement('div');
    content.className = 'news-content';

    const title = document.createElement('h3');
    title.className = 'news-title';
    title.textContent = item.title;

    const date = document.createElement('div');
    date.className = 'news-date';
    date.textContent = item.pubDate.toLocaleDateString();

    const excerpt = document.createElement('div');
    excerpt.className = 'news-excerpt';
    excerpt.textContent = item.excerpt;

    content.appendChild(title);
    content.appendChild(date);
    content.appendChild(excerpt);

    newsElement.appendChild(img);
    newsElement.appendChild(content);

    newsElement.addEventListener('click', () => {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    });

    return newsElement;
  }

  async function fetchNewsFromWpApi() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: 'fetchPosts' }, (response) => {
        console.log('📨 Response received:', response);

        if (response && response.success) {
          if (response.isRSS) {
            console.log('🔄 Using RSS fallback');
            // Parse RSS response
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, 'text/xml');

            if (xmlDoc.querySelector('parsererror')) {
              reject(new Error('Invalid XML format'));
              return;
            }

            const items = xmlDoc.querySelectorAll('item');
            const newsItems = Array.from(items).slice(0, 15);

            if (newsItems.length === 0) {
              reject(new Error('No news items found in the feed'));
              return;
            }

            const processedItems = newsItems.map((item) => {
              const title = item.querySelector('title')?.textContent || 'Untitled';
              const link = item.querySelector('link')?.textContent || 'https://mondary.design/';
              const pubDate = new Date(item.querySelector('pubDate')?.textContent || Date.now());
              const description = item.querySelector('description')?.textContent || '';

              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = description;
              const textContent = tempDiv.textContent || tempDiv.innerText || '';
              const pinIndex = textContent.indexOf('📌');
              const excerpt = pinIndex !== -1
                ? textContent.substring(pinIndex + 2).trim().substring(0, 200)
                : textContent.trim().substring(0, 200);

              // Try to extract image from description HTML
              let imgSrc = fallbackImage;
              const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch && imgMatch[1]) {
                imgSrc = imgMatch[1];
              }

              console.log('🖼️ RSS Image for', title, ':', imgSrc);

              return {
                title,
                link,
                pubDate,
                excerpt,
                imgSrc
              };
            });

            resolve(processedItems);
          } else {
            console.log('✅ Using WP API');
            // Parse WP API response
            const posts = response.data;
            console.log('📦 Posts received:', posts.length);

            if (!Array.isArray(posts) || posts.length === 0) {
              reject(new Error('No posts found from WP API'));
              return;
            }

            const processedItems = posts.slice(0, 15).map((post) => {
              const rawExcerpt = stripHtml(post.excerpt?.rendered || '');
              const pinIndex = rawExcerpt.indexOf('📌');
              const excerpt = pinIndex !== -1
                ? rawExcerpt.substring(pinIndex + 2).trim().substring(0, 200)
                : rawExcerpt.trim().substring(0, 200);

              const imgSrc = getFeaturedImageFromPost(post);
              console.log('🖼️ API Image for', post.title?.rendered, ':', imgSrc);

              return {
                title: decodeHtmlEntities(post.title?.rendered || 'Untitled'),
                link: post.link || 'https://mondary.design/',
                pubDate: new Date(post.date || Date.now()),
                excerpt,
                imgSrc
              };
            });

            resolve(processedItems);
          }
        } else {
          reject(new Error(response?.error || 'Failed to fetch posts'));
        }
      });
    });
  }

  async function fetchNewsFromRssFallback() {
    // This function is now handled within fetchNewsFromWpApi via the background script
    return fetchNewsFromWpApi();
  }

  async function fetchNews() {
    try {
      const newsItems = await fetchNewsFromWpApi().catch(() => fetchNewsFromRssFallback());

      newsContainer.innerHTML = '';
      newsItems.forEach((item) => {
        newsContainer.appendChild(buildNewsCard(item));
      });

      setTimeout(() => {
        footer.classList.add('visible');
      }, 600);
    } catch (error) {
      newsContainer.innerHTML = '<div class="loading">Error loading news</div>';
      console.error('Feed fetch error:', error);
    }
  }

  createLoadingAnimation();
  fetchNews();
});
