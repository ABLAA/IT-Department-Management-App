package com.alro.zoo.Student.Student;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.springframework.data.annotation.Transient;

import com.alro.zoo.UniversitairyYear.StudentClass.StudentClass;
import com.alro.zoo.shared.GenericEntity;

@Entity
public class Student extends GenericEntity {
	
	@Transient
	public static String prefix = "STU";

	@Id
	@Column(length = 15)
	private String code;
	
	private String firstName;
	private String lastName;
	private Date birthDate;
	
	@ManyToOne
	private StudentClass studentClass;
	
	
//	@OneToMany(mappedBy = "author")
//	@JsonIgnore
//	private List<Absence> absences = new ArrayList<>();

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}
	
}
