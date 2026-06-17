// Background script for handling API requests with proper headers
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchPosts') {
    // Try WP API first
    fetch('https://mondary.design/wp-json/wp/v2/posts?per_page=15&_embed=wp:featuredmedia', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`WP API error: ${response.status}`);
      }
      return response.json();
    })
    .then(posts => {
      sendResponse({ success: true, data: posts, isRSS: false });
    })
    .catch(error => {
      console.log('WP API failed, trying RSS fallback:', error);
      // Try RSS fallback
      fetch('https://mondary.design/feed/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`RSS error: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        sendResponse({ success: true, data: text, isRSS: true });
      })
      .catch(rssError => {
        console.error('RSS fallback also failed:', rssError);
        sendResponse({ success: false, error: `Both API and RSS failed: ${error.message}` });
      });
    });

    return true; // Keep message channel open for async response
  }
});
