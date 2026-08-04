---
description: Spotify data toolkit via ScraperSocial — tracks, albums, artists, top tracks, playlists and catalogue search.
tagline: Tracks, albums, artists, top tracks, playlists and search.
---

## lede

Read public Spotify catalogue data as clean JSON. This Spotify API skill returns a track, album, artist, an artist's top tracks, a playlist, or search results across the catalogue — 2 credits per call, no OAuth dance, no token refresh loop.

## when-to-use

- A user pastes a Spotify link and wants the track, album or artist details.
- You are building a music research or recommendation workflow that needs catalogue metadata.
- You want an artist's top tracks or the contents of a public playlist.

## when-not-to-use

- **You are building a real music app.** Spotify's own Web API is free, richer, covers playback and user libraries, and is the licensed route. Use this when you want one client across many platforms and no OAuth setup.
- **You need audio, streams or private library data.** Catalogue metadata only.
- **You need listener counts or royalties.** Not published, not available.

## faq

### How do I get a Spotify track as JSON?

`get_track.js` with the track handle, 2 credits. Albums, artists and playlists have their own scripts at the same price.

### How do I get an artist's top tracks?

`get_artist_top_tracks.js` with the artist handle, 2 credits per track returned.

### Why not just use Spotify's official API?

If Spotify is your only source, do — it is free and more complete. This exists so one key and one envelope cover Spotify alongside the other 32 platforms here.

### Is this an official Spotify API?

No. ScraperSocial is independent and not affiliated with Spotify. It returns publicly available catalogue data only.
