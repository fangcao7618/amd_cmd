 define(["module/student", "module/class",'module/test'], function(student, clz,test) {
     return {
         addNewStudent: function(name, gender) {
             clz.addToClass(student.createStudent(name, gender));
         },
         getMyClassSize: function() {
             return clz.getClassSize();
         }
     };
 });
