document.addEventListener('DOMContentLoaded', () => {


	const getExtension = url => url.slice((Math.max(0, url.lastIndexOf(".")) || Infinity) + 1);
	/**
	 * Remove diacritical marks from text.
	 * @param str
	 * @returns {*}
	 */
	const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

	/**
	 * Do the file download.
	 *
	 * @param event
	 */
	const doDownload = event => {
		event.preventDefault()
		event.stopPropagation()
		const anchorElement = document.createElement('a')
		anchorElement.setAttribute('download', event.target.dataset.download)
		anchorElement.setAttribute('href', event.target.dataset.href)
		anchorElement.click()
	}

	const annotateTracks = tracks => {
		tracks.forEach(track => {

			/* Look for the album name */
			let current = track.parentElement
			let album
			while (current.nodeName !== 'BODY') {
				album = current.querySelector('span.wp-playlist-item-meta.wp-playlist-item-album')
				if (album) {
					break;
				}
				current = current.parentElement
			}

			const url = track.getAttribute('href')
			const namespan = track.querySelector('span.wp-playlist-item-title')
			let name = []
			if (album) {
				name.push( album.innerText)
			}
			if (track.firstChild
				&& track.firstChild.nodeName === '#text'
				&&  'string' === typeof track.firstChild.textContent
				&& track.firstChild.textContent.match(/^\s*[0-9]+\.?\s*$/) ) {
				name.push(track.firstChild.textContent.replace(/^\s*([0-9]+)\.?\s+$/, '$1').padStart(2, '0'))
			}
			name.push (namespan.innerText)
			const nice = removeAccents(name.join(' '))
				.replace(/[^A-Za-z0-9]+/g, '_')
				.replace(/^_/, '')
				.replace(/_$/, '')
			const link = document.createElement('span')
			link.dataset.href = url
			link.dataset.download = nice + '.' + getExtension(url)
			link.classList.add('playlist-download-link', 'dashicons', 'dashicons-download')
			link.setAttribute('title', 'Download' + ' ' + namespan.innerText)
			link.appendChild(document.createTextNode(''));
			link.addEventListener('click', doDownload, {capture: true})

			const item = track.parentElement;
			item.appendChild(link)
		})
	}


	const poll = setInterval(() => {
		const tracks = document.querySelectorAll('div > div.wp-playlist-tracks > div.wp-playlist-item > a.wp-playlist-caption')
		if (tracks) {
			clearInterval(poll)
			annotateTracks(tracks)
		}
	}, 50);

});
