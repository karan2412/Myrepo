package org.jmit.kg.jobs.beans;

public class User {

	private Integer userId;
	private String password;
	private String phone;
	private String address;
	private String email;
	private String name;
	private String stream;
	private String branch;
	private Integer marksSsc;
	private Integer marksHsc;
	private Integer marksGrad;
	private Integer marksPostGrad;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStream() {
		return stream;
	}

	public void setStream(String stream) {
		this.stream = stream;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public Integer getMarksSsc() {
		return marksSsc;
	}

	public void setMarksSsc(Integer marksSsc) {
		this.marksSsc = marksSsc;
	}

	public Integer getMarksHsc() {
		return marksHsc;
	}

	public void setMarksHsc(Integer marksHsc) {
		this.marksHsc = marksHsc;
	}

	public Integer getMarksGrad() {
		return marksGrad;
	}

	public void setMarksGrad(Integer marksGrad) {
		this.marksGrad = marksGrad;
	}

	public Integer getMarksPostGrad() {
		return marksPostGrad;
	}

	public void setMarksPostGrad(Integer marksPostGrad) {
		this.marksPostGrad = marksPostGrad;
	}

}
