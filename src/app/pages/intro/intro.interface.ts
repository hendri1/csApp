export interface IntroSlidesInterface {
  count: number;
  slides: Array<slides>;
}

export interface slides {
  id: number;
  title: string;
  message: string;
  image: string;
}