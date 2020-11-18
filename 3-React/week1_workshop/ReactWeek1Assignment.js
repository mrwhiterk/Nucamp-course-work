class Student {
  constructor(name, email, community) {
    this.name = name;
    this.email = email;
    this.community = community;
  }
}

class Bootcamp {
  constructor(name, level, students = []) {
    this.name = name;
    this.level = level;
    this.students = students;
  }

  registerStudent(student) {
    
    if (this.students.some((x) => x.email == student.email)) {
      console.log(
        `Student with ${student.email} already registered to bootcamp ${this.name}.`
      );
    } else {
      this.students.push(student);
      console.log(`Registering ${student.email} to the bootcamp ${this.name}.`);
    }

    return this.students;
  }
}
