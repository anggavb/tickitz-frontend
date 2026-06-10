import Swal from 'sweetalert2';

const primaryColor = '#ff5722';
const cancelColor = '#6b7280';

const baseOptions = {
  confirmButtonColor: primaryColor,
  cancelButtonColor: cancelColor,
  heightAuto: false,
};

const SweetAlert = {
  show(options = {}) {
    return Swal.fire({
      ...baseOptions,
      ...options,
    });
  },

  success(options = {}) {
    return SweetAlert.show({
      icon: 'success',
      title: 'Success',
      timer: 2000,
      timerProgressBar: true,
      ...options,
    });
  },

  error(options = {}) {
    return SweetAlert.show({
      icon: 'error',
      title: 'Error',
      ...options,
    });
  },

  async confirm(options = {}) {
    const result = await SweetAlert.show({
      icon: 'warning',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      ...options,
    });

    return result.isConfirmed;
  },

  loading(options = {}) {
    return SweetAlert.show({
      title: 'Loading...',
      text: 'Please wait',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      ...options,
    });
  },

  close() {
    Swal.close();
  },
};

export default SweetAlert;
