import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {CoreModule} from '../../../../core/core.module';
import {NotificationService} from '../../../../core/service/notification.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {VacationManagementService} from '../../service/vacation-management.service';
import {VacationManagementListComponent} from './vacation-management-list.component';
import {getMock} from '../../mock/getMock';


describe('Component List: Vacation', () => {
  let component: VacationManagementListComponent;
  let fixture: ComponentFixture<VacationManagementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [VacationManagementListComponent],
      providers: [
        NotificationService,
        VacationManagementService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verifica a criação do componente', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica a rota de adicionar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onAdd();
    expect(navigateSpy).toHaveBeenCalledWith(['vacationManagement/add']);
  });

  it('Verifica a rota de editar', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.onEdit(getMock);
    expect(navigateSpy).toHaveBeenCalledWith([`vacationManagement/edit/${getMock.id}`]);
  });

  it('Verifica a função de remover', () => {
    expect(() => component.onRemove(getMock)).not.toThrow();
  });

});
