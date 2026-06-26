// cloudinary-upload.js
// رفع مباشر من المتصفح لـ Cloudinary (Unsigned Upload Preset)
// يُستخدم في admin-lessons.html لرفع فيديوهات وملفات PDF الدروس

const CLOUDINARY_CLOUD_NAME = "deefnnqdm";
const CLOUDINARY_UPLOAD_PRESET = "ALNGAH";

/**
 * رفع ملف لـ Cloudinary مع تتبع نسبة التقدم
 * @param {File} file الملف المراد رفعه
 * @param {"video"|"raw"} resourceType نوع المورد - video للفيديوهات، raw لملفات PDF وغيرها
 * @param {function} onProgress callback يستقبل نسبة مئوية (0-100)
 * @returns {Promise<string>} رابط الملف المرفوع (secure_url)
 */
function uploadToCloudinary(file, resourceType, onProgress) {
  return new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      try {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && response.secure_url) {
          resolve(response.secure_url);
        } else {
          const errMsg = (response.error && response.error.message) || "فشل رفع الملف.";
          reject(new Error(errMsg));
        }
      } catch (e) {
        reject(new Error("استجابة غير متوقعة من خادم الرفع."));
      }
    };

    xhr.onerror = () => reject(new Error("تعذر الاتصال بخادم الرفع، تحقق من الإنترنت."));

    xhr.send(formData);
  });
}
