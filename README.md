: لوحة تحكم إدارة السوبر ماركت

نظام إدارة بسيط واحترافي لسوبر ماركت تم تطويره باستخدام:
-  Next.js (تايب سكريبت)
-  Tailwind CSS و shadcn/ui
-  Axios لجلب البيانات
-  JSON Server كقاعدة بيانات وهمية

---

 : فكرة المشروع

تطبيق ويب لإدارة منتجات السوبر ماركت يتيح للمستخدم:

- عرض جميع المنتجات في جدول احترافي
- إضافة منتجات جديدة
- تعديل المنتجات الحالية
- حذف المنتجات
- عرض إحصائيات المنتجات (عدد المنتجات - المنتجات منخفضة المخزون - القيمة الإجمالية)

---

##  المتطلبات الأساسية

- وجود Node.js (الإصدار 18 أو أعلى)
- npm أو yarn

---

##  خطوات التثبيت

1. (تثبيت الحزم الأساسية:)

```bash
npm install
# أو
yarn install



 Axios تثبيت:
 
  npm install axios
# أو
yarn add axios


3.⁠ ⁠تثبيت JSON Server بشكل عام (Global):



npm install -g json-server
# أو
yarn global add json-server



--- المشروع تشغيل 

1.⁠ ⁠تشغيل JSON Server (منفصل تيرمينال في):



json-server --watch db.json --port 3001

➡️ يعمل على: http://localhost:3001

2.⁠ ⁠تشغيل تطبيق Next.js:



npm run dev
# أو
yarn dev



➡️ يعمل على: http://localhost:3000


---

 APIs	:
GET /products	جلب جميع المنتجات
POST /products	إضافة منتج جديد
PUT /products/:id	تعديل بيانات منتج
DELETE /products/:id	حذف منتج





---
الاستخدام طريقة

1.⁠التحكم لوحة علي الدخول


2.⁠ ⁠المنتجات جدول عرض


3.⁠جديد منتج "Add Product"زر علي اضغط


4.⁠ "save"علي اضغط ثم النموذج تعبئة


5.البيانات وقاعدة التحكم لوحة مباشرة المنتج


## 🔗 رابط تشغيل المشروع

[اضغط هنا لتشغيل الموقع]## 🔗 رابط تشغيل المشروع

[اضغط هنا لتشغيل الموقع](https://686e430d60c091f172d1f797--supermarket22.netlify.app/)


---




👨 المطور

الاسم: مصطفي محمد 

الدور: مطور واجهات أمامية (Front-End)

المهارات: React, Next.js, UI/UX, Tailwind, REST APIs






