
const SW_KEY = "npw";

self.addEventListener( "install", e => e.waitUntil(
	caches.open( SW_KEY).then( c => c.addAll( [
		"oteage.png",
		"clear.png",
		"neko.png",

		"skeleton_touch.js"
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
