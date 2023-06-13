import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appPlaces]',
})
export class PlacesDirective {
  @Output('addressSelected') addressSelected = new EventEmitter<string>();

  private placesList: string[] = [
    'Gol Gappay',
    'Fruit Chat',
    'Mota Goshat',
    'Machii',
    'Cushtar',
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.initializeAutocomplete();
  }

  private initializeAutocomplete() {
    this.el.nativeElement.addEventListener('input', (event: any) => {
      const inputText = event.target.value;
      this.showAutocompleteList(inputText);
    });

    this.el.nativeElement.addEventListener('focusout', () => {
      this.clearAutocompleteList();
    });

    this.el.nativeElement.addEventListener('keydown', (event: any) => {
      const keyCode = event.keyCode;
      if (keyCode === 13) {
        // Enter key pressed
        const selectedAddress = this.el.nativeElement.value;
        this.addressSelected.emit(selectedAddress);
        this.clearAutocompleteList();
      }
    });
  }

  private showAutocompleteList(inputText: string) {
    this.clearAutocompleteList();

    if (!inputText) {
      return;
    }

    const filteredPlaces = this.placesList.filter((place) =>
      place.toLowerCase().includes(inputText.toLowerCase())
    );

    const listContainer = this.renderer.createElement('ul');
    listContainer.classList.add(
      'autocomplete-list',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded',
      'py-2',
      'px-3',
      'text-gray-700'
    );

    filteredPlaces.forEach((place) => {
      const listItem = this.renderer.createElement('li');
      listItem.innerText = place;
      listItem.classList.add(
        'autocomplete-item',
        'cursor-pointer',
        'hover:bg-indigo-300',
        'px-2',
        'py-1'
      );

      this.renderer.listen(listItem, 'click', () => {
        this.el.nativeElement.value = place;
        this.addressSelected.emit(place);
        this.clearAutocompleteList();
      });

      this.renderer.appendChild(listContainer, listItem);
    });

    this.renderer.appendChild(this.el.nativeElement.parentNode, listContainer);
  }

  private clearAutocompleteList() {
    const listContainer =
      this.el.nativeElement.parentNode.querySelector('.autocomplete-list');
    if (listContainer) {
      this.renderer.removeChild(
        this.el.nativeElement.parentNode,
        listContainer
      );
    }
  }
}
