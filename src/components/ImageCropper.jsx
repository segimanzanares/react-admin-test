import React, { useState, useRef } from 'react'
import Cropper from 'cropperjs'
import PropTypes from 'prop-types'

const ImageCropper = (props) => {
    const [imageUrl, setImageUrl] = useState(null)
    const [imageDestination, setImageDestination] = useState(null)
    const [imageData, setImageData] = useState({
        name: null,
        contents: null
    })
    const [showCropper, setShowCropper] = useState(false)
    const [cropper, setCropper] = useState(null)
    const imageCropperRef = useRef(null)
    let inputId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)

    const readFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target.result);
                initCropper();
            };
            reader.readAsDataURL(e.target.files[0]);
            setImageData({ ...imageData, name: e.target.files[0].name });
        }
    }

    const initCropper = () => {
        setShowCropper(true)
        setCropper(new Cropper(imageCropperRef.current, {
            aspectRatio: props.ratio ? props.ratio : NaN,
            dragMode: 'move',
            movable: true,
            rotatable: true,
            scalable: true,
            zoomable: true,
            checkCrossOrigin: true,
            guides: true,
            viewMode: 1,
            autoCropArea: .5,
            minContainerWidth: 400,
            minContainerHeight: 300,
            background: true
        }));
    }

    const crop = () => {
        let contents = cropper.getCroppedCanvas({
            maxWidth: 720,
            maxHeight: 720
        }).toDataURL()
        setImageDestination(contents)
        let croppedImageData = { ...imageData, contents }
        setImageData(croppedImageData)
        setShowCropper(false)
        props.onImageCropped(croppedImageData)
        cropper.destroy()
    }

    return (
        <div className="image-cropper pt-2">
            <div className="text-center">
                {
                    showCropper ?
                        <button type="button" className="mb-2 btn btn-sm btn-success"
                            onClick={crop}>Cortar</button>
                        : ''
                }
            </div>
            <div className={'crop-wrapper ' + (!showCropper ? 'hidden' : '')}>
                <img ref={imageCropperRef} src={imageUrl} crossOrigin="true" alt="cropper" />
            </div>
            <div className={'img-preview ' + (showCropper ? 'hidden' : '')}>
                <img src={imageDestination ? imageDestination : props.src}
                    className={props.previewClass ? props.previewClass : ''} />
                {
                    !props.hideInput ? <div className="mt-2">
                        <label className="btn btn-secondary" htmlFor={'file-' + inputId}>
                            Seleccionar imagen
                            </label>
                        <input id={'file-' + inputId} type="file" className={'form-control cropper-file ' + (props.hasError ? 'is-invalid' : '')}
                            onChange={readFile} />
                    </div> : ''
                }
            </div>
        </div>
    );
}

ImageCropper.propTypes = {
    src: PropTypes.string.isRequired,
    ratio: PropTypes.number,
    hasError: PropTypes.bool,
    previewClass: PropTypes.string,
    hideInput: PropTypes.bool,
    onImageCropped: PropTypes.func.isRequired,
}
//@Output() imageCropped: EventEmitter<ImageData> = new EventEmitter();

export default ImageCropper;