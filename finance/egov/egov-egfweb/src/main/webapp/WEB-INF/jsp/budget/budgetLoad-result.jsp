<%--
  ~    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
  ~    accountability and the service delivery of the government  organizations.
  ~
  ~     Copyright (C) 2017  eGovernments Foundation
  ~
  ~     The updated version of eGov suite of products as by eGovernments Foundation
  ~     is available at http://www.egovernments.org
  ~
  ~     This program is free software: you can redistribute it and/or modify
  ~     it under the terms of the GNU General Public License as published by
  ~     the Free Software Foundation, either version 3 of the License, or
  ~     any later version.
  ~
  ~     This program is distributed in the hope that it will be useful,
  ~     but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~     GNU General Public License for more details.
  ~
  ~     You should have received a copy of the GNU General Public License
  ~     along with this program. If not, see http://www.gnu.org/licenses/ or
  ~     http://www.gnu.org/licenses/gpl.html .
  ~
  ~     In addition to the terms of the GPL license to be adhered to in using this
  ~     program, the following additional terms are to be complied with:
  ~
  ~         1) All versions of this program, verbatim or modified must carry this
  ~            Legal Notice.
  ~            Further, all user interfaces, including but not limited to citizen facing interfaces,
  ~            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
  ~            derived works should carry eGovernments Foundation logo on the top right corner.
  ~
  ~            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
  ~            For any further queries on attribution, including queries on brand guidelines,
  ~            please contact contact@egovernments.org
  ~
  ~         2) Any misrepresentation of the origin of the material is prohibited. It
  ~            is required that all modified versions of this material be marked in
  ~            reasonable ways as different from the original version.
  ~
  ~         3) This license does not grant any rights to any user of the program
  ~            with regards to rights under trademark law for use of the trade names
  ~            or trademarks of eGovernments Foundation.
  ~
  ~   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
  ~
  --%>


<html>
<%@ include file="/includes/taglibs.jsp"%>
<%@ page language="java"%>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><s:text name="budgetload" /></title>
<script type="text/javascript">
	function urlLoad(fileStoreId) {
		var sUrl = "/services/egi/downloadfile?fileStoreId=" + fileStoreId
				+ "&moduleName=EGF";
		window.location = sUrl;
	}
</script>
</head>
<body>
	<s:form action="budgetLoad" theme="css_xhtml" name="budgetLoad"
		id="budgetLoad" enctype="multipart/form-data" method="post">
		<div class="formmainbox">
			<div class="formheading"></div>
			<div class="subheadnew">
				<s:text name="budgetload" />
			</div>

			<div align="center">
				<font style='color: red;'>
					<div id="msg">
						<s:property value="message" />
					</div>
					<p class="error-block" id="lblError"></p>
				</font>
			</div>
			<span class="mandatory1">
				<div id="Errors">
					<s:actionerror />
					<s:fielderror />
				</div> 
			</span>
			<span style="color: green"><s:actionmessage /></span>
			<center>
			    <s:if test="%{!isManualEntry}">
				<table align="center" width="100%">
					<tr align="center">
						<th style="width: 2%; text-align: center" align="center"><a
							href="#"
							onclick="urlLoad('<s:property value="%{originalFileStoreId}" />');"
							id="sourceLink" /> <s:text name="lbl.download.original.file"/> </a></th>

					</tr>
					<tr align="center">
						<th style="width: 2%; text-align: center" align="center"><a
							href="#"
							onclick="urlLoad('<s:property value="%{outPutFileStoreId}" />');"
							id="sourceLink" /><s:text name="lbl.download.output.file"/> </a></th>
					</tr>
				</table>
				</s:if>

				<div class="buttonbottom" id="buttondiv">
					<table>
						<tr>
							<!-- <td><input type="button" value="<s:text name='lbl.close'/>"
								onclick="window.parent.postMessage('close','*');window.close();" class="buttonsubmit" /></td> -->
							<!-- <td><input type="button" value="Close"
								onclick="window.history.back();" class="buttonsubmit" /></td> -->
							<td><input type="button" value="Close" onclick="window.location.reload();" class="buttonsubmit" /></td>						
						</tr>
					</table>
				</div>
			</center>
		</div>

	</s:form>
</body>
</html>
