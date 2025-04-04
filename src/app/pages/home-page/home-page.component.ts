import {
  afterNextRender,
  afterRender,
  Component,
  effect,
  signal,
} from '@angular/core';
import { TitleComponent } from '../../components/navbar/title/title.component';

const log = (...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(', ')} `,
    'color: #bada55'
  );
};

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  traditionalProperty = 'Juan Manuel';
  signalProperty = signal('Juan Manuel');

  constructor() {
    console.log('Constructor call');
  }

  changeTraditional() {
    this.traditionalProperty = 'Juan Manuel Arnaiz';
  }

  changeSignal() {
    this.signalProperty.set(
      this.signalProperty() === 'Juan Manuel'
        ? ' Juan Manuel Arnaiz'
        : 'Juan Manuel'
    );
  }

  // lEffect es una funcion que se ejecuta siempre que un signal que este dentro de esta funcion, cambie de valor.
  basicEffect = effect((onCleanUp) => {
    log(
      'effect',
      'Disparar efectos secundarios.'
      // 'Valor de la señal: ',
      // this.signalProperty()
    );
    // Si pongo en el log el valor de la señal, se ejecuta cuando pulso sobre el botón
    // y después llama al onCleanUp. Si no lo pongo, no se ejecuta el effect.

    onCleanUp(() => {
      log('onCleanup', 'Se ejecuta cuando el efecto se va a destruir');
    });
  });

  ngOnInit() {
    log(
      'ngOnInit',
      "Runs once after Angular has initialized all the component's inputs."
    );
  }

  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }

  ngDoCheck() {
    log('ngDoCheck', 'Runs every time this component is checked for changes.');
  }

  ngAfterContentInit() {
    log(
      'ngAfterContentInit',
      "Runs once after the component's content has been initialized."
    );
  }

  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked',
      'Runs every time this component content has been checked for changes.'
    );
  }

  ngAfterViewInit() {
    log(
      'ngAfterViewInit',
      "Runs once after the component's view has been initialized."
    );
  }

  ngAfterViewChecked() {
    log(
      'ngAfterViewChecked',
      "Runs every time the component's view has been checked for changes."
    );
  }

  ngOnDestroy() {
    log('ngOnDestroy', '	Runs once before the component is destroyed.');
  }

  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRender',
      'Runs once the next time that all components have been rendered to the DOM.'
    );
  });

  afterRender = afterRender(() => {
    log(
      'afterRender',
      'Runs every time all components have been rendered to the DOM.'
    );
  });
}
