# Whingi Birthday Letter

A small mobile-first birthday website with a secret nickname reveal, personal letters, photo gallery, and optional piano music.

## Add real photographs

Six supplied photos are already included in public/photos/ and listed in public/script.js. To replace or add photos later:

1. Add image files under public/photos/ (for example public/photos/photo-1.jpg).
2. Open public/script.js and edit the photos list near the top. Set each src to a path such as /photos/photo-1.jpg and edit its caption.
3. Deploy again. Photos are shown without cropping; select a photo to open the lightbox.

Use only photos you have permission to share. Images keep their original framing, and the gallery opens each one in a lightbox.

## Add piano music

Put a royalty-free instrumental recording named piano.mp3 in the public/ folder. The play button offers a one-tap fallback because browsers may block autoplay. The site remains usable if the file is absent.

## Edit the writing

All visible text is in public/index.html; the secret nickname is intentionally hidden until its envelope is opened.

## Publish and share

This Hatchable project is private by default. To let visitors open the permanent link without signing in, change project visibility in Hatchable Settings. The temporary preview link can be used for a quick review.