export namespace Constants {
  export class Application {
    static readonly TOKEN_KEY = 'token';
    static readonly APPLICATION_NAME = 'Mallak';
    static readonly LANGUAGE_KEY = 'language';
  }

  export class Routing {

    static readonly LOGIN = '/portal/login';
    static readonly PARENTS = '/parents';
    static readonly CHILDCARE = '/childcare';
    static readonly DRIVERS = '/drivers';
    static readonly SKILLS = '/skills';
    static readonly SETTINGS = '/settings';
    static readonly ORDERS = '/orders';
    static readonly CHILDCARE_SERVICE = '/childcareservice';
    static readonly ADDRESSES = '/addresses';
    static readonly APPOINTMENTS = '/appointments';
    static readonly LEAVES = '/leaves';
    static readonly CHAT = '/chat';
    static readonly Discount = '/discount';
    static readonly ADMINS = '/admins';

    // FIXME NOT_IMPLEMENTED
    static readonly SERVER_ERROR = 'error500';
    static readonly NOT_FOUND = 'error404';
    static readonly FOEBIDDEN = 'error403';
  }

  export class API {
    static readonly Parent = {
      root: 'Parent/parent',
      all: 'Parent/parents',
    };
    static readonly Admins = {
      root: 'AdminProfile/admin',
      all: 'AdminProfile/admins',
    };
    static readonly Leaves = {
      root: 'Leave/leave',
      all: 'Leave/leaves',
      byProfileId: 'Leave/LeavesByProfileId'
    };
    static readonly ChildCare = {
      root: 'ChildCare/childcareprofessional',
      all: 'ChildCare/childcareprofessionals',
      available: 'Appointment/ChildcareServiceAppointment/GetAvailableNannies'
    };
    static readonly Discount = {
      root: 'Discount/discount',
      all: 'Discount/discounts',
    };
    static readonly CHILD_CARE_SERVICE_APPLICATION = 'ServiceApplication/childcare';
    static readonly DRIVERS = {
      root: 'Driver/driver',
      all: 'Driver/drivers',
      available: 'Appointment/ChildcareServiceAppointment/GetAvailableDrivers',
    };
    static readonly Appointment = {
      root: 'Appointment/appointment',
      assignNani: 'Appointment/appointment/AssignNannyToAppointment',
      assignDriver: 'Appointment/appointment/AssignDriverToAppointment',
      assignNaniMultiple: 'Appointment/appointment/AssignNannyToMultipleAppointments',
      assignDriverMultiple: 'Appointment/appointment/AssignDriverToMultipleAppointments',
      UpdateAppointmentStartAndEndTime: 'Appointment/appointment/UpdateAppointmentStartAndEndTime'
    };
    static readonly CHAT = {
      users: 'Chat/users',
      conversation: 'Chat/conversations'
    };

    static readonly ORDERS = {
      root: 'Order/order',
      setAsPrePaid: 'Order/SetOrderAsPaid'
    };

    static readonly SKILLS = 'SkillSet/skill';
    static readonly Setting = 'setting/setting';
    static readonly Addresses = 'address/address';
    static readonly Shifts = 'ShiftType/shiftType';
  }

}
