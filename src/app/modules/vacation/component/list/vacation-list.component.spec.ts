import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {CoreModule} from '../../../../core/core.module';
import {NotificationService} from '../../../../core/service/notification.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {VacationService} from '../../service/vacation.service';
import {VacationListComponent} from './vacation-list.component';
import {getMock} from '../../mock/getMock';


describe('Component List: Vacation', () => {
  let component: VacationListComponent;
  let fixture: ComponentFixture<VacationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [VacationListComponent],
      providers: [
        NotificationService,
        VacationService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verifica a criação do componente', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica a rota de adicionar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onAdd();
    expect(navigateSpy).toHaveBeenCalledWith(['vacation/add']);
  });

  it('Verifica a rota de editar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onEdit(getMock);
    expect(navigateSpy).toHaveBeenCalledWith([`vacation/edit/${getMock.id}`]);
  });

  it('Verifica a função de remover', () => {
    expect(() => component.onRemove(getMock)).not.toThrow();
  });

});
