import { TestBed, async } from '@angular/core/testing';
import { CDCApp } from './app.component';
import 'jasmine';

describe('CDCApp', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CDCApp
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CDCApp);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'CDC'`, () => {
    const fixture = TestBed.createComponent(CDCApp);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('CDC');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(CDCApp);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to CDC!');
  });
});
