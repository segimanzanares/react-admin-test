import Swal from 'sweetalert2'

export function showConfirmDialog(config) {
    var swalCfg = {
        title: config.title,
        text: config.msg,
        icon: config.icon === void 0 ? 'warning' : config.icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si, hazlo",
        cancelButtonText: "Cancelar",
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary'
        }
    };
    if (config.input !== void 0) {
        swalCfg.input = config.input;
    }
    if (config.inputPlaceholder !== void 0) {
        swalCfg.inputPlaceholder = config.inputPlaceholder;
    }
    if (config.inputValidator !== void 0) {
        swalCfg.inputValidator = config.inputValidator;
    }
    Swal.fire(swalCfg).then(function(result) {
        if (result.value !== void 0) {
            if (config.input !== void 0) {
                config.callback(result.value);
            }
            else {
                config.callback();
            }
        }
    }).catch(Swal.noop);
}