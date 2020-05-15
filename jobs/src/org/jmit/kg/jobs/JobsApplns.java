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
import org.jmit.kg.jobs.beans.JobApplns;
import org.jmit.kg.jobs.util.JobUtils;
import org.jmit.kg.jobs.util.ValueUtil;

@WebServlet("/jobapplns")
public class JobsApplns extends HttpServlet {

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
				getListOfJobsApplns(request);
				RequestDispatcher rd=request.getRequestDispatcher("jsp/jobapplns.jsp");
				rd.forward(request, response);
			}
	
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}  
	}

	private static void getListOfJobsApplns(HttpServletRequest request) throws ClassNotFoundException,
			SQLException {
		Statement stmt = JobUtils.getConnection();  
		ResultSet rs = stmt.executeQuery("select DISTINCT u.roll_number, a.job_id, u.mobile, j.job_title, j.company, j.date, j.stream, j.time_and_venue, u.name "
				+ "from users u , job_applications a, jobs j where u.roll_number = a.roll_number AND j.job_id = a.job_id");
		List<JobApplns> lstJobApplns = new ArrayList<>();
		
		while (rs.next()) {
			JobApplns jobAppln = new JobApplns();
			
			jobAppln.setRollno(rs.getInt(1));
			jobAppln.setJobId(rs.getInt(2));
			jobAppln.setMobile(rs.getString(3));
			jobAppln.setJobTitle(rs.getString(4));
			jobAppln.setCompany(rs.getString(5));
			jobAppln.setDate(rs.getString(6));
			jobAppln.setStream(rs.getString(7));
			jobAppln.setTimevenue(rs.getString(8));
			jobAppln.setName(rs.getString(9));
			
			lstJobApplns.add(jobAppln);
		}
		
		request.setAttribute("lstJobApplns", lstJobApplns);
		
	}

}
