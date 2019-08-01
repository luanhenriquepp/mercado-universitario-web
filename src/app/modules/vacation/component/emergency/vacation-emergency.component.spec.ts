import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {CoreModule} from '../../../../core/core.module';
import {NotificationService} from '../../../../core/service/notification.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {VacationEmergencyComponent} from './vacation-emergency.component';
import {VacationService} from '../../service/vacation.service';
import {getMock} from '../../mock/getMock';


describe('Component: Vacation', () => {

  let component: VacationEmergencyComponent;
  let fixture: ComponentFixture<VacationEmergencyComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [VacationEmergencyComponent],
      providers: [
        NotificationService,
        VacationService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verifica a criação do componente', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica a função de voltar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['vacation']);
  });

  it('Verifica o parse do modelo antes de salvar', () => {
    const transform = component.transformBeforeSave(getMock);
    expect(transform).toEqual(getMock);
  });

  it('Verifica o parse do modelo ao editar', () => {
    const transform = component.transformReceiveData(getMock);
    expect(transform).toEqual(getMock);
  });


});
