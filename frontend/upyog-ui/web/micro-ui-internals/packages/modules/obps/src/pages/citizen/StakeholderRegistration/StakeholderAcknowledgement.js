import { BackButton, Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@upyog/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { convertToStakeholderObject } from "../../../utils/index";
import getAcknowledgementData from "../../../../getAcknowlegment";
const GetActionMessage = ( props) => {
  const LicenseType=props?.data?.Licenses?.[0]?.tradeLicenseDetail?.tradeUnits?.[0]?.tradeType?.split(".")[0] || "ARCHITECT";
  const { t } = useTranslation();
  if (props.isSuccess) {
    return !window.location.href.includes("edit-application") ? `${t(`TRADELICENSE_TRADETYPE_${LicenseType}`)}${t(`CS_STAKEHOLDER_APPLICATION_SUCCESS`)}` : t("CS_PROPERTY_UPDATE_APPLICATION_SUCCESS");
  } else if (props.isLoading) {
    return !window.location.href.includes("edit-application") ? t("CS_STAKEHOLDER_APPLICATION_PENDING") : t("CS_PROPERTY_UPDATE_APPLICATION_PENDING");
  } else if (!props.isSuccess) {
    return !window.location.href.includes("edit-application") ? t("CS_STAKEHOLDER_APPLICATION_FAILED") : t("CS_PROPERTY_UPDATE_APPLICATION_FAILED");
  }
};

const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  const LicenseType=props?.data?.Licenses?.[0]?.tradeLicenseDetail?.tradeUnits?.[0]?.tradeType?.split(".")[0] || "ARCHITECT";
  return (
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.Licenses[0].applicationNumber}
      info={props.isSuccess ? `${props.t(`TRADELICENSE_TRADETYPE_${LicenseType}`)} ${props.t("BPA_NEW_STAKEHOLDER_REGISTRATION_APP_LABEL")}` : ""}
      successful={props.isSuccess}
      style={{ padding: "10px" }}
      headerStyles={{ fontSize: "32px" }}
    />
  );
};

const StakeholderAcknowledgement = ({ data, onSuccess }) => {
  const { t } = useTranslation();
  const {id}= useParams();
  //const isPropertyMutation = window.location.href.includes("property-mutation");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.obps.useStakeholderAPI(data?.address?.city ? data.address?.city?.code : tenantId, true);
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  let isOpenLinkFlow = window.location.href.includes("openlink");
  const isCitizenUrl = Digit.Utils.browser.isMobile() ? true : false;
  const licenseType = mutation?.data?.Licenses?.[0]?.tradeLicenseDetail?.tradeUnits?.[0]?.tradeType?.split(".")[0] || "ARCHITECT";

  useEffect(() => {
    try {
      let tenantId = data?.result?.Licenses[0]?.tenantId ? data?.result?.Licenses[0]?.tenantId : tenantId;
      data.tenantId = tenantId;
      let formdata = {};
      formdata = convertToStakeholderObject(data);
      mutation.mutate(formdata, {
        onSuccess,
      });
    } catch (err) {
    }
  }, []);
  const state = tenantId?.split('.')[0]
  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: tenantId?.split('.')[0],
    id: id,
    moduleCode: "BPAREG",
  });
  const {  data: applicationDetails } = Digit.Hooks.obps.useLicenseDetails(state, { applicationNumber: id, tenantId: state }, {});
  const handleDownloadPdf = async () => {
    const Property = applicationDetails ;
    const tenantInfo  = tenants.find((tenant) => tenant.code === Property.tenantId);

    const acknowledgementData = await getAcknowledgementData(Property, tenantInfo, t);
   
    Digit.Utils.pdf.generate(acknowledgementData);
    
  };

  return mutation.isLoading || mutation.isIdle ? (
    <Loader />
  ) : (
    <div>
      <div className={isOpenLinkFlow ? "OpenlinkContainer" : ""}>
        {/* {isOpenLinkFlow &&<OpenLinkContainer />}
    <div style={isOpenLinkFlow?{marginTop:"60px", width:isCitizenUrl?"100%":"70%", marginLeft:"auto",marginRight:"auto"}:{}}> */}
        {isOpenLinkFlow && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
        <Card>
          <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation.isIdle || mutation.isLoading} />
          {mutation.isSuccess && <CardText>{`${t(`TRADELICENSE_TRADETYPE_${licenseType}`)}${t(`CS_FILE_STAKEHOLDER_RESPONSE`)}`}</CardText>}
          {!mutation.isSuccess && <CardText>{t("CS_FILE_PROPERTY_FAILED_RESPONSE")}</CardText>}
          {mutation.isSuccess && !isOpenLinkFlow && (
            <Link
              to={{
                pathname: `/upyog-ui/citizen/payment/collect/${mutation.data.Licenses[0].businessService}/${mutation.data.Licenses[0].applicationNumber}/${mutation.data.Licenses[0].tenantId}?tenantId=${mutation.data.Licenses[0].tenantId}`,
                state: { tenantId: mutation.data.Licenses[0].tenantId },
              }}
            >
              <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
            </Link>
          )}
          {mutation.isSuccess &&(
              <div style={{marginTop:"10px"}}>
              <SubmitBar label={t("CS_COMMON_DOWNLOAD")} onSubmit={handleDownloadPdf}/>
              </div>
          )}
          {!isOpenLinkFlow && (
            <Link to={`/upyog-ui/citizen`}>
              <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
            </Link>
          )}
          {mutation.isSuccess && isOpenLinkFlow && (
            <Link
              to={{
                pathname: `/upyog-ui/citizen`,
              }}
            >
              <SubmitBar label={t("BPA_COMMON_PROCEED_NEXT")} />
            </Link>
          )}
        </Card>
      </div>
    </div>
    // </div>
  );
};

export default StakeholderAcknowledgement;
