
const SW_KEY = "rjw";

self.addEventListener( "install", e => e.waitUntil(
	caches.open( SW_KEY).then( c => c.addAll( [
		"image/bg_game_1.png",
		"image/bg_game_2.png",
		"image/bg_game_over.png",
		"image/bg_title.png",
		"image/ground.png",
		"image/tama.png",
		"image/tora.png",

		"audio/bgm_game.mp3",
		"audio/se_touch.mp3",
		"audio/se_hit.mp3",
		"audio/se_coin.mp3",

		"skeleton_touch.js",
		"skeleton_audio.js"
	]))
));

self.addEventListener( "activate", e => {});

self.addEventListener( "fetch", e => e.respondWith(
	caches.match( e.request).then( c_res => {
		if( c_res) return c_res;

		return fetch( e.request.clone()).then( f_res => {
			if( !f_res || f_res.status != 200 || f_res.type != "basic") return f_res;

			caches.open( SW_KEY).then( c => c.put( e.request, f_res.clone()));
			return f_res;
		});
	})
));
