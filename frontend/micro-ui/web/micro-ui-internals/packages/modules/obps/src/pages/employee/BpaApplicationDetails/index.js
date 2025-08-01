import React, { useState, Fragment, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormComposer, Header, Card, CardSectionHeader, PDFSvg, Loader, StatusTable, Row, ActionBar, SubmitBar, MultiLink, LinkButton } from "@upyog/digit-ui-react-components";
import ApplicationDetailsTemplate from "../../../../../templates/ApplicationDetails";
import { newConfig as newConfigFI } from "../../../config/InspectionReportConfig";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { getBusinessServices, convertDateToEpoch, downloadPdf, printPdf } from "../../../utils";
import cloneDeep from "lodash/cloneDeep";
import useBPADetailsPage from "../../../../../../libraries/src/hooks/obps/useBPADetailsPage";
import useWorkflowDetails from "../../../../../../libraries/src/hooks/workflow";
import useApplicationActions from "../../../../../../libraries/src/hooks/obps/useApplicationActions";
const BpaApplicationDetail = () => {

  const { id } = useParams();
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [showToast, setShowToast] = useState(null);
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {};
  const history = useHistory();
  // delete
  const [_formData, setFormData, _clear] = Digit.Hooks.useSessionStorage("store-data", null);
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_HAPPENED", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MUTATION_SUCCESS_DATA", {});
  const [error, setError] = useState(null);
  const stateId = Digit.ULBService.getStateId();
  const isMobile = window.Digit.Utils.browser.isMobile();
  const { isLoading: bpaDocsLoading, data: bpaDocs } = Digit.Hooks.obps.useMDMS(stateId, "BPA", ["DocTypeMapping"]);
  const [viewTimeline, setViewTimeline]=useState(false);
  let { data: newConfig } = Digit.Hooks.obps.SearchMdmsTypes.getFormConfig(stateId, []);

  const { isMdmsLoading, data: mdmsData } = Digit.Hooks.obps.useMDMS(stateId, "BPA", ["RiskTypeComputation"]);

  const { data = {}, isLoading } = useBPADetailsPage(tenantId, { applicationNo: id });


  let businessService = [];

  if(data?.applicationData?.businessService === "BPA_LOW")
  {
    businessService = ["BPA.LOW_RISK_PERMIT_FEE"]
  }
  else if(data?.applicationData?.businessService === "BPA"||data?.applicationData?.businessService === "BPA-PAP")
  {
    businessService = ["BPA.NC_APP_FEE","BPA.NC_SAN_FEE"];
  }
  else if(data?.applicationData?.businessService === "BPA_OC")
  {
    businessService = ["BPA.NC_OC_APP_FEE","BPA.NC_OC_SAN_FEE"];
  }

  useEffect(() => {
    if(!bpaDocsLoading && !isLoading){
      let filtredBpaDocs = [];
      if (bpaDocs?.BPA?.DocTypeMapping) {
        filtredBpaDocs = bpaDocs?.BPA?.DocTypeMapping?.filter(ob => (ob.WFState == "INPROGRESS" && ob.RiskType == data?.applicationData?.riskType && ob.ServiceType == data?.applicationData?.additionalDetails?.serviceType && ob.applicationType == data?.applicationData?.additionalDetails?.applicationType))
        let documents = data?.applicationDetails?.filter((ob) => ob.title === "BPA_DOCUMENT_DETAILS_LABEL")[0]?.additionalDetails?.obpsDocuments?.[0]?.values;
        let RealignedDocument = [];
        filtredBpaDocs && filtredBpaDocs?.[0]?.docTypes && filtredBpaDocs?.[0]?.docTypes.map((ob) => {
            documents && documents.filter(x => ob.code === x.documentType.slice(0,x.documentType.lastIndexOf("."))).map((doc) => {
                RealignedDocument.push(doc);
            })
        })
        const newApplicationDetails = data.applicationDetails && data.applicationDetails.map((obj) => {
          if(obj.title === "BPA_DOCUMENT_DETAILS_LABEL")
          {
            return {...obj, additionalDetails:{obpsDocuments:[{title:"",values:RealignedDocument}]}}
          }
          return obj;
        })
        data.applicationDetails = newApplicationDetails && newApplicationDetails.length > 0 ?[...newApplicationDetails]: data?.applicationDetails;
    }
    }
  },[bpaDocs,data])

  async function getRecieptSearch({tenantId, payments, ...params}) {
    let response=null;
    if (payments?.fileStoreId ) {
       response = { filestoreIds: [payments?.fileStoreId] };      
    }
    else{
      const formattedStakeholderType=data?.applicationData?.additionalDetails?.typeOfArchitect
            const stakeholderType=formattedStakeholderType.charAt(0).toUpperCase()+formattedStakeholderType.slice(1).toLowerCase()
      const updatedpayments={
        ...payments,
       
            paymentDetails:[
              {
                ...payments.paymentDetails?.[0],
                additionalDetails:{
                  ...payments.paymentDetails[0].additionalDetails,
                  "propertyID":data?.applicationData?.additionalDetails?.propertyID,
                  "stakeholderType":stakeholderType,
                  "contact":data?.applicationData?.businessService==="BPA-PAP"? t("APPLICANT_CONTACT") : `${stakeholderType} Contact`,
                  "idType":data?.applicationData?.businessService==="BPA-PAP" ? t("APPLICATION_NUMBER"):`${stakeholderType} ID`,
                  "name":data?.applicationData?.businessService==="BPA-PAP" ? t("APPLICANT_NAME"):`${stakeholderType} Name`,
                },
              },
            ],  
         
      }
       response = await Digit.PaymentService.generatePdf(stateId, { Payments: [{...updatedpayments}] }, "bpa-receipt");
    }    
    const fileStore = await Digit.PaymentService.printReciept(stateId, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response?.filestoreIds[0]], "_blank");
  }

  async function getPermitOccupancyOrderSearch({tenantId},order,mode="download") {
    let currentDate = new Date();
    data.applicationData.additionalDetails.runDate = convertDateToEpoch(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate());
    let requestData = {...data?.applicationData, edcrDetail:[{...data?.edcrDetails}]}
    let response = await Digit.PaymentService.generatePdf(tenantId, { Bpa: [requestData] }, order);
    const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response?.filestoreIds[0]], "_blank");
    requestData["applicationType"] = data?.applicationData?.additionalDetails?.applicationType;
    let edcrResponse = await Digit.OBPSService.edcr_report_download({BPA: {...requestData}});
    const responseStatus = parseInt(edcrResponse.status, 10);
    if (responseStatus === 201 || responseStatus === 200) {
      mode == "print"
        ? printPdf(new Blob([edcrResponse.data], { type: "application/pdf" }))
        : downloadPdf(new Blob([edcrResponse.data], { type: "application/pdf" }), `edcrReport.pdf`);
    }
  }

  async function getRevocationPDFSearch({tenantId,...params}) {
    let requestData = {...data?.applicationData}
    let response = await Digit.PaymentService.generatePdf(tenantId, { Bpa: [requestData] }, "bpa-revocation");
    const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: response.filestoreIds[0] });
    window.open(fileStore[response?.filestoreIds[0]], "_blank");
  }

  const [showOptions, setShowOptions] = useState(false);

  
  const handleViewTimeline=()=>{
    setViewTimeline(true);
      const timelineSection=document.getElementById('timeline');
      if(timelineSection){
        timelineSection.scrollIntoView({behavior: 'smooth'});
      } 
  };
  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = useApplicationActions(tenantId);

  const nocMutation = Digit.Hooks.obps.useObpsAPI(
    tenantId,
    true
  );
  let risType = "";
  sessionStorage.setItem("bpaApplicationDetails", true);


  function checkHead(head) {
    if (head === "ES_NEW_APPLICATION_LOCATION_DETAILS") {
      return "TL_CHECK_ADDRESS";
    } else if (head === "ES_NEW_APPLICATION_OWNERSHIP_DETAILS") {
      return "TL_OWNERSHIP_DETAILS_HEADER";
    } else {
      return head;
    }
  }


  const closeToast = () => {
    setShowToast(null);
    setError(null);
  };

  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
  }, []);

  const onFormValueChange = (setValue, formData, formState) => {
    setSubmitValve(!Object.keys(formState.errors).length);
  };

  let configs =  newConfig?.InspectionReportConfig ? newConfig?.InspectionReportConfig : newConfigFI;
  
  let workflowDetails = useWorkflowDetails({
    tenantId: tenantId,
    id: id,
    moduleCode: "BPA",
  });

  if (workflowDetails && workflowDetails.data && !workflowDetails.isLoading){

  
  workflowDetails.data.initialActionState=workflowDetails?.data?.initialActionState||{...workflowDetails?.data?.actionState}||{} ;
    workflowDetails.data.actionState = { ...workflowDetails.data };
  }
  if (mdmsData?.BPA?.RiskTypeComputation && data?.edcrDetails) {
    risType = Digit.Utils.obps.calculateRiskType(mdmsData?.BPA?.RiskTypeComputation, data?.edcrDetails?.planDetail?.plot?.area, data?.edcrDetails?.planDetail?.blocks);
    data?.applicationDetails?.map(detail => {
      if (detail?.isInsert) {
        detail.values?.forEach(value => {
          if (value?.isInsert) value.value = `WF_BPA_${risType}`
        })
      }
    })
  }

  const userInfo = Digit.UserService.getUser();
  const rolearray = userInfo?.info?.roles.filter(item => {
    if ((item.code == "CEMP" && item.tenantId === tenantId) || item.code == "CITIZEN") return true;
  });

  if (workflowDetails?.data?.processInstances?.length > 0) {
    let filteredActions = [];
    filteredActions = get(workflowDetails?.data?.processInstances[0], "nextActions", [])?.filter(
      item => item.action != "ADHOC"
    );
    let actions = orderBy(filteredActions, ["action"], ["desc"]);
    if ((!actions || actions?.length == 0) && workflowDetails?.data?.actionState) workflowDetails.data.actionState.nextActions = [];
  }

  if (workflowDetails?.data?.nextActions?.length > 0) {
    workflowDetails.data.nextActions = workflowDetails?.data?.nextActions?.filter(actn => actn.action !== "INITIATE");
    workflowDetails.data.nextActions = workflowDetails?.data?.nextActions?.filter(actn => actn.action !== "ADHOC");
  };

  if (rolearray) {
    workflowDetails?.data?.nextActions?.forEach(action => {
      if (action?.action === "PAY") {
        action.redirectionUrll =  {
          pathname: `${getBusinessServices(data?.applicationData?.businessService, data?.applicationData?.status)}/${data?.applicationData?.applicationNo}/${tenantId}?tenantId=${tenantId}`,
          state: tenantId
        }
      }
    })
  };

  let dowloadOptions = [];

  if (data?.collectionBillDetails?.length > 0) {
    const bpaPayments = cloneDeep(data?.collectionBillDetails);
    bpaPayments.forEach(pay => {
      if (pay?.paymentDetails[0]?.businessService === "BPA.NC_OC_APP_FEE") {
        dowloadOptions.push({
          order: 1,
          label: t("BPA_APP_FEE_RECEIPT"),
          onClick: () => getRecieptSearch({ tenantId: data?.applicationData?.tenantId, payments: pay, consumerCodes: data?.applicationData?.applicationNo }),
        });
      }

      if (pay?.paymentDetails[0]?.businessService === "BPA.NC_OC_SAN_FEE") {
        dowloadOptions.push({
          order: 2,
          label: t("BPA_OC_DEV_PEN_RECEIPT"),
          onClick: () => getRecieptSearch({ tenantId: data?.applicationData?.tenantId, payments: pay, consumerCodes: data?.applicationData?.applicationNo }),
        });
      }

      if (pay?.paymentDetails[0]?.businessService === "BPA.LOW_RISK_PERMIT_FEE") {
        dowloadOptions.push({
          order: 1,
          label: t("BPA_FEE_RECEIPT"),
          onClick: () => getRecieptSearch({ tenantId: data?.applicationData?.tenantId, payments: pay, consumerCodes: data?.applicationData?.applicationNo }),
        });
      }

      if (pay?.paymentDetails[0]?.businessService === "BPA.NC_APP_FEE") {
        dowloadOptions.push({
          order: 1,
          label: t("BPA_APP_FEE_RECEIPT"),
          onClick: () => getRecieptSearch({ tenantId: data?.applicationData?.tenantId, payments: pay, consumerCodes: data?.applicationData?.applicationNo }),
        });
      }

      if (pay?.paymentDetails[0]?.businessService === "BPA.NC_SAN_FEE") {
        dowloadOptions.push({
          order: 2,
          label: t("BPA_SAN_FEE_RECEIPT"),
          onClick: () => getRecieptSearch({ tenantId: data?.applicationData?.tenantId, payments: pay, consumerCodes: data?.applicationData?.applicationNo }),
        });
      }
    })
  }


  if(data && data?.applicationData?.businessService === "BPA_LOW" && data?.collectionBillDetails?.length > 0) {
    !(data?.applicationData?.status.includes("REVOCATION")) && dowloadOptions.push({
      order: 3,
      label: t("BPA_PERMIT_ORDER"),
      onClick: () => getPermitOccupancyOrderSearch({tenantId: data?.applicationData?.tenantId},"buildingpermit-low"),
    });
    (data?.applicationData?.status.includes("REVOCATION")) && dowloadOptions.push({
      order: 3,
      label: t("BPA_REVOCATION_PDF_LABEL"),
      onClick: () => getRevocationPDFSearch({tenantId: data?.applicationData?.tenantId}),
    });
    
  } else if(data && (data?.applicationData?.businessService === "BPA"||data?.applicationData?.businessService==="BPA-PAP") && data?.collectionBillDetails?.length > 0) {
    if(data?.applicationData?.status==="APPROVED"){
    dowloadOptions.push({
      order: 3,
      label: t("BPA_PERMIT_ORDER"),
      onClick: () => getPermitOccupancyOrderSearch({tenantId: data?.applicationData?.tenantId},"buildingpermit"),
    });}
  } else {
    if(data?.applicationData?.status==="APPROVED"){
      dowloadOptions.push({
        order: 3,
        label: t("BPA_OC_CERTIFICATE"),
        onClick: () => getPermitOccupancyOrderSearch({tenantId: data?.applicationData?.tenantId},"occupancy-certificate"),
      });
    }
  }

  if(data?.comparisionReport && data && data?.applicationData?.businessService === "BPA_OC"){
    dowloadOptions.push({
      order: 4,
      label: t("BPA_COMPARISON_REPORT_LABEL"),
      onClick: () => window.open(data?.comparisionReport?.comparisonReport, "_blank"),
    });
  }

  dowloadOptions.sort(function (a, b) { return a.order - b.order; });

  if (workflowDetails?.data?.nextActions?.length > 0) {
    workflowDetails.data.nextActions = workflowDetails?.data?.nextActions?.filter(actn => actn.action !== "SKIP_PAYMENT");
  };

  if (workflowDetails?.data?.nextActions?.length > 0) {
    workflowDetails.data.nextActions = workflowDetails?.data?.nextActions?.filter(actn => actn.action !== "SKIP_PAYMENT");
  };

  const results = data?.applicationDetails?.filter(element => {
    if (Object.keys(element).length !== 0) {
      return true;
    }
    return false;
  });

  data.applicationDetails = results;
  return (
    <Fragment>
      <div className={"employee-main-application-details"}>
      <div className={"employee-application-detailsNew"} style={{marginBottom: "15px",height:"auto !important", maxHeight:"none !important"}}>
        <Header styles={{marginLeft:"0px", paddingTop: "10px", fontSize: "32px"}}>{t("CS_TITLE_APPLICATION_DETAILS")}</Header>
        <div style={{zIndex: "10",display:"flex",flexDirection:"row-reverse",alignItems:"center",marginTop:"-25px"}}>
               
        <div style={{zIndex: "10",  position: "relative"}}>
        {dowloadOptions && dowloadOptions.length>0 && <MultiLink                
          className="multilinkWrapper"
          onHeadClick={() => setShowOptions(!showOptions)}
          displayOptions={showOptions}
          options={dowloadOptions}
          downloadBtnClassName={"employee-download-btn-className"}
          optionsClassName={"employee-options-btn-className"}
          />}  
        </div>     
        <LinkButton label={t("VIEW_TIMELINE")} style={{ color:"#A52A2A"}} onClick={handleViewTimeline}></LinkButton>
        </div>
      {data?.applicationData?.status === "FIELDINSPECTION_INPROGRESS" && (userInfo?.info?.roles.filter(role => role.code === "BPA_FIELD_INSPECTOR")).length>0 && <FormComposer
        heading={t("")}
        isDisabled={!canSubmit}
        config={configs.map((config) => {
          return {
            ...config,
            body: config.body.filter((a) => {
              return !a.hideInEmployee;
            }),
            head: checkHead(config.head),
          };
        })}
        fieldStyle={{ marginRight: 0 }}
        submitInForm={false}
        defaultValues={defaultValues}
        onFormValueChange={onFormValueChange}
        breaklineStyle={{ border: "0px" }}
        className={"employeeCard-override"}
        cardClassName={"employeeCard-override"}
      />}
      <ApplicationDetailsTemplate
        applicationDetails={data}
        isLoading={isLoading}
        isDataLoading={isLoading}
        applicationData={data?.applicationData}
        nocMutation={nocMutation}
        mutate={mutate}
        id={"timeline"}
        workflowDetails={workflowDetails}
        businessService={workflowDetails?.data?.applicationBusinessService ? workflowDetails?.data?.applicationBusinessService : data?.applicationData?.businessService}
        moduleCode="BPA"
        showToast={showToast}
        ActionBarStyle={isMobile?{}:{paddingRight:"50px"}}
        MenuStyle={isMobile?{}:{right:"50px"}}
        setShowToast={setShowToast}
        closeToast={closeToast}
        statusAttribute={"state"}
        timelineStatusPrefix={`WF_${workflowDetails?.data?.applicationBusinessService ? workflowDetails?.data?.applicationBusinessService : data?.applicationData?.businessService}_`}
      />
      </div>
      </div>
    </Fragment>
  )
};

export default BpaApplicationDetail;