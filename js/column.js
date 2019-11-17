const Column = {
	idCounter: 4,
	dragged: null,
	process(columnElement) {
		const spanAction__addNote = columnElement.querySelector('[data-action-addNote]');

		spanAction__addNote.addEventListener('click', function (event) {
			const noteElement = Note.create();

			columnElement.querySelector('[data-notes]').append(noteElement);

			noteElement.setAttribute('contenteditable', 'true');
			noteElement.focus();
		});
		const headerElement = columnElement.querySelector('.column-header');
		headerElement.addEventListener('dblclick', function (event) {
			headerElement.setAttribute('contenteditable', true);
			headerElement.focus();
		});
		headerElement.addEventListener('blur', function (event) {
			headerElement.removeAttribute('contenteditable');
		});

		columnElement.addEventListener('dragstart', Column.dragstart);
		columnElement.addEventListener('dragend', Column.dragend);

		columnElement.addEventListener('dragenter', Column.dragenter);
		columnElement.addEventListener('dragleave', Column.dragleave);

		columnElement.addEventListener('dragover', Column.dragover);
		columnElement.addEventListener('drop', Column.drop);
	},

	dragstart(event) {
		Column.dragged = this;
		Column.dragged.classList.add('dragged');
		event.stopPropagation();
	},
	dragend(event) {
		Column.dragged.classList.remove('dragged');
		Column.dragged = null;
	},

	dragenter(event) {
		if(!Column.dragged || Column.dragged === this) {
			return;
		}
		console.log('dragenter');
	},
	dragleave(event) {
		if(!Column.dragged || Column.dragged === this) {
			return;
		}
		this.classList.remove('under');
		console.log('dragleave');
	},
	dragover(event) {
		event.preventDefault();
	},

	drop() {
		if (Note.dragged) {
			return columnElement.querySelector('[data-notes]').append(Note.dragged);
		}
		else if(Column.dragged) {
			const children = Array.from(document.querySelector('.columns').children);
			const indexA = children.indexOf(this);
			const indexB = children.indexOf(Column.dragged);

			if(indexA < indexB) {
				document.querySelector('.columns').insertBefore(Column.dragged, this);
			}
			else{
				document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling);
			}
		}
	}
};