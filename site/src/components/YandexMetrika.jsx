import React from 'react';

export { YandexMetrika };

const METRIKA_ID = process.env.YM_ID;

function YandexMetrika() {
	if (!METRIKA_ID || process.env.NODE_ENV !== 'production') {
		return <React.Fragment></React.Fragment>;
	}

	let code = `
		(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
		m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
		(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

		ym(${METRIKA_ID}, "init", {
			clickmap:true,
			trackLinks:true,
			accurateTrackBounce:true
		});
	`
		.replace(/^[\s\t]+/gm, '')
		.trim();

	return <script dangerouslySetInnerHTML={{ __html: code }}></script>;
}
