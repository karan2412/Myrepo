package org.jmit.kg.jobs.beans;

public class Job {

	private Integer jobId;
	private String jobTitle;
	private String jobDesc;
	private String company;
	private String date;
	private String stream;
	private String branch;
	private Integer marksSsc;
	private Integer marksHsc;
	private Integer marksGrad;

	public Integer getJobId() {
		return jobId;
	}

	public void setJobId(Integer jobId) {
		this.jobId = jobId;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
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

}
