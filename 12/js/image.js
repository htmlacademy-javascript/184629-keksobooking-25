const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview');
const previewAvatarImg = previewAvatar.getElementsByTagName('img')[0];

const fileChooserPhotoAds = document.querySelector('.ad-form__upload input[type=file]');
const previewPhotoAds = document.querySelector('.ad-form__photo');

const uploadAnImage = (fileChooser, previewImg) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImg.src = URL.createObjectURL(file);
  }
};
const uploadAnAvatar = () => uploadAnImage(fileChooserAvatar, previewAvatarImg);
const uploadAnDwellingPhoto = (evt) => {
  previewPhotoAds.innerHTML='';
  const newImage = document.createElement('img');
  newImage.style.width = '100%';
  newImage.style.height = '100%';
  newImage.style.objectFit = 'cover';
  uploadAnImage(evt.target, newImage);
  previewPhotoAds.appendChild(newImage);
};

const onAvatarChange = () => {
  fileChooserAvatar.addEventListener('change', uploadAnAvatar);
};
const onPhotoAdsChange = () => {
  fileChooserPhotoAds.addEventListener('change', (evt) => uploadAnDwellingPhoto(evt));
};

const clearPreviewImg = () => {
  previewAvatarImg.src = DEFAULT_AVATAR;
  previewPhotoAds.innerHTML='';
};

export {onAvatarChange, onPhotoAdsChange, clearPreviewImg};
