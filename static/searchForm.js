// Add a small form to filter through the output of Nginx FancyIndex page
// © 2017, Lilian Besson (Naereen) and contributors,
// open-sourced under the MIT License, https://lbesson.mit-license.org/
// hosted on GitHub, https://GitHub.com/Naereen/Nginx-Fancyindex-Theme

let form = document.createElement('form')
let input = document.createElement('input')

input.name = 'filter'
input.id = 'search'
input.placeholder = 'Type to search...'

form.appendChild(input)

document.getElementById('dir_path').after(form)

let listItems = Array.from(
	document.querySelectorAll('#list tbody tr'),
	item => ({
		item: item,
		// File name or directory name of this item, hence basename
		basename: item.querySelector('td').textContent.replace(/\s+/g, ' '),
	})
)

input.addEventListener('keyup', function() {
	// Word sequence _matching_ to input. All, except last, words must be _complete_.
	let pattern = "(^|.*[^\\pL])" + this.value.trim().split(/\s+/).join("([^\\pL]|[^\\pL].*[^\\pL])") + ".*$"
	// Search case insensitive
	let n = RegExp(pattern, "i")
	for (const e of listItems) {
		if (!n.test(e.basename)) {
			e.item.hidden = true
		} else {
			e.item.removeAttribute('hidden')
		}
	}
})
