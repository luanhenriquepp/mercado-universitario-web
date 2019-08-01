import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {CoreModule} from '../../../../core/core.module';
import {NotificationService} from '../../../../core/service/notification.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {VacationManagementPersistComponent} from './vacation-management-persist.component';
import {VacationManagementService} from '../../service/vacation-management.service';
import {getMock} from '../../mock/getMock';


describe('Component: VacationManagement', () => {

  let component: VacationManagementPersistComponent;
  let fixture: ComponentFixture<VacationManagementPersistComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [VacationManagementPersistComponent],
      providers: [
        NotificationService,
        VacationManagementService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationManagementPersistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verifica a criação do componente', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica a função de voltar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['vacationManagement']);
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
