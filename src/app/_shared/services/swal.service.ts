import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  loader = Swal.mixin({
    timerProgressBar: true,
    heightAuto: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  success = Swal.mixin({
    icon: 'success',
    confirmButtonColor: 'rgba(0, 31, 48, 1)',
    heightAuto: false,
  });

  warning = Swal.mixin({
    icon: 'warning',
    confirmButtonColor: 'rgba(0, 31, 48, 1)',
    heightAuto: false,
  });

  error = Swal.mixin({
    icon: 'error',
    confirmButtonColor: 'rgba(0, 31, 48, 1)',
    heightAuto: false,
  });

  close() {
    return Swal.close();
  }
}
