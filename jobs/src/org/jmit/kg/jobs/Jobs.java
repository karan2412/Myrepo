package org.jmit.kg.jobs;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.jmit.kg.jobs.beans.Job;
import org.jmit.kg.jobs.util.JobUtils;
import org.jmit.kg.jobs.util.ValueUtil;

@WebServlet("/jobs")
public class Jobs extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String mode = request.getParameter("MODE");
		System.out.println("MODE : " + mode);

		try {

			if (!ValueUtil.getBooleanValue(session.getAttribute("IS_LOGGED_IN"))) {
				request.setAttribute("ERROR_MSG", "Please log in with your credentials !!!");
				RequestDispatcher rd=request.getRequestDispatcher("login");
				rd.forward(request, response);
			} else if ("LIST".equals(mode)) {
				getListOfJobs(request, response);
				RequestDispatcher rd=request.getRequestDispatcher("jsp/jobs.jsp");
				rd.forward(request, response);
			} else if ("ADD_JOB".equals(mode)) {
				RequestDispatcher rd=request.getRequestDispatcher("jsp/jobs.jsp");
				rd.forward(request, response);
			} else if ("UPDATE_JOB".equals(mode)) {
				String jobId = request.getParameter("JOBID");
				Job job = findJob(jobId);
				request.setAttribute("job", job);
				RequestDispatcher rd=request.getRequestDispatcher("jsp/jobs.jsp");
				rd.forward(request, response);
			} else if ("ADD_DATA".equals(mode)) {
				addData(request, response);
			} else if ("UPDATE_DATA".equals(mode)) {
				updateData(request, response);
			} else if ("APPLY_JOB".equals(mode)) {
				getListOfJobs(request, response);
				applyJob(request, response);
			} else if ("APPLN".equals(mode)) {
				// TODO: List of Job Applications
			}
 			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}  
		
	}

	private void applyJob(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException {
		String jobId = request.getParameter("JOBID");
		HttpSession session = request.getSession();
		String rollno = ValueUtil.getStringValueNotNull(session.getAttribute("ROLLNO"));

		Statement stmt = JobUtils.getConnection();  
		Integer inserted = stmt.executeUpdate("INSERT INTO JOB_APPLICATIONS  VALUES ("+jobId+", "+rollno+")");
		
		RequestDispatcher rd = null;
		request.setAttribute("SUCCESS_MSG", "");
		request.setAttribute("ERROR_MSG", "");
		if (inserted > 0) {
			request.setAttribute("SUCCESS_MSG", "Job applied Successfully !!!");
			rd = request.getRequestDispatcher("jsp/jobs.jsp");
		} else {
			request.setAttribute("ERROR_MSG", "Unable to post a Job !! Try after sometime !!");
			rd = request.getRequestDispatcher("jsp/jobs.jsp");
		}
		rd.forward(request, response);		
	}

	private Job findJob(String jobId) throws ClassNotFoundException, SQLException {
		Job job = null;
		Statement stmt = JobUtils.getConnection();
		ResultSet rs = stmt.executeQuery("SELECT * FROM JOBS WHERE JOB_ID = " + jobId);
		if (rs.first()) {
			job = new Job();
			
			job.setJobId(rs.getInt(1));
			job.setJobTitle(rs.getString(2));
			job.setJobDesc(rs.getString(3));
			job.setCompany(rs.getString(4));
			job.setDate(rs.getString(5));
			job.setStream(rs.getString(6));
			job.setTimenvenue(rs.getString(7));
			job.setMarksSsc(rs.getDouble(8));
			job.setMarksHsc(rs.getDouble(9));
			job.setMarksGrad(rs.getDouble(10));
			job.setMarksPGrad(rs.getDouble(11));
			job.setBacklogs(rs.getInt(12));
		}
		
		return job;
	}

	private void updateData(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException {
		String jobId = request.getParameter("JOBID");
		String title = request.getParameter("txtJobTitle");
		String desc = request.getParameter("txtJobDesc");
		String company = request.getParameter("txtCompany");
		String date = request.getParameter("txtDate");
		String stream = request.getParameter("txtStream");
		String timenvenue = request.getParameter("txttimenven");
		String ssc = request.getParameter("txtMarksSsc");
		String hsc = request.getParameter("txtMarksHsc");
		String grad = request.getParameter("txtMarksGrad");
		String pgrad = request.getParameter("txtMarksPGrad");
		String backlog = request.getParameter("txtallow");


		Statement stmt = JobUtils.getConnection();  
		
		Integer updated = stmt.executeUpdate("UPDATE JOBS SET  job_desc = '"+desc+"', date = '"+date+"', company = '"+company+"', "
				+ "stream = '"+stream+"', time_and_venue = '"+timenvenue+"', job_title  = '"+title+"',"
				+ "marks_ssc = "+ssc+", marks_hsc = "+hsc+", marks_grad = "+grad+", marks_postgraduation = "+pgrad+", Allowed_backlogs = "+backlog+" WHERE JOB_ID = " + jobId);
		
		RequestDispatcher rd = null;
		request.setAttribute("SUCCESS_MSG", "");
		request.setAttribute("ERROR_MSG", "");
		if (updated > 0) {
			request.setAttribute("SUCCESS_MSG", "Job Posting Info Updated Successfully !!!");
			rd = request.getRequestDispatcher("jobs?MODE=UPDATE_JOB&JOBID="+jobId);
		} else {
			request.setAttribute("ERROR_MSG", "Unable to update Job Posting !! Try after sometime !!");
			rd = request.getRequestDispatcher("jsp/jobs.jsp");
		}
		rd.forward(request, response);
		
	}

	private static void addData(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException {
		
		//String userId = request.getParameter("txtJobId");
		String title = request.getParameter("txtJobTitle");
		String desc = request.getParameter("txtJobDesc");
		String company = request.getParameter("txtCompany");
		String date = request.getParameter("txtDate");
		String stream = request.getParameter("txtStream");
		String timenvenue = request.getParameter("txttimenven");
		String ssc = request.getParameter("txtMarksSsc");
		String hsc = request.getParameter("txtMarksHsc");
		String grad = request.getParameter("txtMarksGrad");
		String pgrad = request.getParameter("txtMarksPGrad");
		String backlog = request.getParameter("txtallow");

		Statement stmt = JobUtils.getConnection();  
		//(user_id, password, phone, address, name, stream, branch, marks_ssc, marks_hsc, marks_grad, marks_postgrad, email)
		Integer inserted = stmt.executeUpdate("INSERT INTO JOBS (job_title, job_desc, company, date, stream, time_and_venue, marks_ssc, marks_hsc, marks_grad, marks_postgraduation, Allowed_backlogs) VALUES ('"+title+"', '"+desc+"', '"+company+"', '"+date+"', '"+stream+"', "
						+ "'"+timenvenue+"', "+ssc+", "+hsc+", "+grad+", "+pgrad+", "+backlog+")");
		
		RequestDispatcher rd = null;
		request.setAttribute("SUCCESS_MSG", "");
		request.setAttribute("ERROR_MSG", "");
		if (inserted > 0) {
			request.setAttribute("SUCCESS_MSG", "Job Posted Successfully !!!");
			//request.setAttribute("MODE", "LIST");
			rd = request.getRequestDispatcher("jsp/jobs.jsp");
		} else {
			request.setAttribute("ERROR_MSG", "Unable to post a Job !! Try after sometime !!");
			rd = request.getRequestDispatcher("jsp/jobs.jsp");
		}
		rd.forward(request, response);
		
	}

	private void getListOfJobs(HttpServletRequest request,
			HttpServletResponse response) throws ClassNotFoundException,
			SQLException, ServletException, IOException {
		Statement stmt = JobUtils.getConnection();  
		ResultSet rs = stmt.executeQuery("select * from jobs");
		List<Job> lstJobs = new ArrayList<>();
		
		while (rs.next()) {
			Job job = new Job();
			
			job.setJobId(rs.getInt(1));
			job.setJobTitle(rs.getString(2));
			job.setJobDesc(rs.getString(3));
			job.setCompany(rs.getString(4));
			job.setDate(rs.getString(5));
			job.setStream(rs.getString(6));
			job.setTimenvenue(rs.getString(7));
			job.setMarksSsc(rs.getDouble(8));
			job.setMarksHsc(rs.getDouble(9));
			job.setMarksGrad(rs.getDouble(10));
			job.setMarksPGrad(rs.getDouble(11));
			job.setBacklogs(rs.getInt(12));
			
			lstJobs.add(job);
		}
		
		request.setAttribute("lstJobs", lstJobs);
		
	}

}
