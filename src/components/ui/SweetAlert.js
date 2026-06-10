import Swal from 'sweetalert2';

/**
 * @typedef {import('sweetalert2').SweetAlertOptions} SweetAlertOptions
 * SweetAlert2 options. Common fields:
 * - title, titleText, text, html, icon, iconColor
 * - confirmButtonText, cancelButtonText, confirmButtonColor, cancelButtonColor
 * - showConfirmButton, showCancelButton, timer, timerProgressBar
 * - allowOutsideClick, allowEscapeKey, didOpen, didClose
 */

const primaryColor = '#ff5722';
const cancelColor = '#6b7280';

const baseOptions = {
  confirmButtonColor: primaryColor,
  cancelButtonColor: cancelColor,
  heightAuto: false,
};

const SweetAlert = {
  /**
   * Show a custom SweetAlert2 popup.
   *
   * Available options: all SweetAlert2 options, including title, text, html,
   * icon, showCancelButton, confirmButtonText, cancelButtonText, timer,
   * allowOutsideClick, allowEscapeKey, customClass, and lifecycle hooks.
   *
   * Default options: confirmButtonColor, cancelButtonColor, heightAuto.
   *
   * @param {SweetAlertOptions} [options={}] Custom SweetAlert2 options.
   * @returns {Promise<import('sweetalert2').SweetAlertResult>} SweetAlert2 result.
   */
  show(options = {}) {
    return Swal.fire({
      ...baseOptions,
      ...options,
    });
  },

  /**
   * Show a success popup.
   *
   * Available options: all SweetAlert2 options. Most commonly title, text,
   * html, timer, timerProgressBar, confirmButtonText, showConfirmButton,
   * didOpen, and didClose.
   *
   * Default options: icon='success', title='Success', timer=2000,
   * timerProgressBar=true. These can be overridden through options.
   *
   * @param {SweetAlertOptions} [options={}] Custom SweetAlert2 options.
   * @returns {Promise<import('sweetalert2').SweetAlertResult>} SweetAlert2 result.
   */
  success(options = {}) {
    return SweetAlert.show({
      icon: 'success',
      title: 'Success',
      timer: 2000,
      timerProgressBar: true,
      ...options,
    });
  },

  /**
   * Show an error popup.
   *
   * Available options: all SweetAlert2 options. Most commonly title, text,
   * html, confirmButtonText, footer, allowOutsideClick, allowEscapeKey,
   * didOpen, and didClose.
   *
   * Default options: icon='error', title='Error'. These can be overridden
   * through options.
   *
   * @param {SweetAlertOptions} [options={}] Custom SweetAlert2 options.
   * @returns {Promise<import('sweetalert2').SweetAlertResult>} SweetAlert2 result.
   */
  error(options = {}) {
    return SweetAlert.show({
      icon: 'error',
      title: 'Error',
      ...options,
    });
  },

  /**
   * Show a confirmation popup and return whether the user confirmed.
   *
   * Available options: all SweetAlert2 options. Most commonly title, text,
   * html, confirmButtonText, cancelButtonText, confirmButtonColor,
   * cancelButtonColor, reverseButtons, allowOutsideClick, and allowEscapeKey.
   *
   * Default options: icon='warning', title='Are you sure?',
   * showCancelButton=true, confirmButtonText='Yes', cancelButtonText='Cancel',
   * reverseButtons=true. These can be overridden through options.
   *
   * @param {SweetAlertOptions} [options={}] Custom SweetAlert2 options.
   * @returns {Promise<boolean>} True when confirmed, false when cancelled/dismissed.
   */
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

  /**
   * Show a non-dismissible loading popup.
   *
   * Available options: all SweetAlert2 options. Most commonly title, text,
   * html, allowOutsideClick, allowEscapeKey, showConfirmButton, didOpen,
   * and didClose.
   *
   * Default options: title='Loading...', text='Please wait',
   * allowOutsideClick=false, allowEscapeKey=false, showConfirmButton=false.
   * If didOpen is provided, it is called after Swal.showLoading().
   *
   * @param {SweetAlertOptions} [options={}] Custom SweetAlert2 options.
   * @returns {Promise<import('sweetalert2').SweetAlertResult>} SweetAlert2 result.
   */
  loading(options = {}) {
    const { didOpen, ...loadingOptions } = options;

    return SweetAlert.show({
      title: 'Loading...',
      text: 'Please wait',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: (popup) => {
        Swal.showLoading();
        didOpen?.(popup);
      },
      ...loadingOptions,
    });
  },

  /**
   * Close the currently active SweetAlert2 popup.
   *
   * Use this after loading() when the async process finishes.
   *
   * @returns {void}
   */
  close() {
    Swal.close();
  },
};

export default SweetAlert;
