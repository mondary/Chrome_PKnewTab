Voici une liste claire des invites importantes pour votre extension Chrome :


1. Manifest Configuration:
- manifest_version: 3
- author: cmondary
- website: https://mondary.design
- version format: YYYY.XX (e.g., 2025.03 or 2025.154)


2. ZIP Command for Extension:
zip -r NewTabRssMondary.zip . -x "*.DS_Store"

3. Image Cropping Commands:
convert xxx.png -crop 1280x800+0+0 NewTabRssMondary_1280x800_cropped.png
convert xxx.png -crop 440x280+0+0 NewTabRssMondary_440x280_cropped.png
convert xxx.png -crop 1400x560+0+0 NewTabRssMondary_1400x560_cropped.png


4. Permission Justification:
- activeTab: Required to modify and interact with the new tab page content
- host permission (mondary.design): Necessary to fetch RSS feed data from the website