import React, { useEffect,useState } from "react";
import {
  StandaloneSearchBar,
  Loader,
  CardBasedOptions,
  ComplaintIcon,
  PTIcon,
  CaseIcon,
  DropIcon,
  HomeIcon,
  Calender,
  DocumentIcon,
  HelpIcon,
  WhatsNewCard,
  OBPSIcon,
  WSICon,
} from "@upyog/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { CitizenSideBar } from "../../../components/TopBarSideBar/SideBar/CitizenSideBar";
import StaticCitizenSideBar from "../../../components/TopBarSideBar/SideBar/StaticCitizenSideBar";
import ChatBot from "./ChatBot";
const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const [user, setUser] = useState(null);
  const DEFAULT_REDIRECT_URL = "/upyog-ui/citizen";
  const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  let isMobile = window.Digit.Utils.browser.isMobile();
  if(window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE",{})
   
  const conditionsToDisableNotificationCountTrigger = () => {
    if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
    if (!Digit.UserService?.getUser()?.access_token) return false;
    return true;
  };

  const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
    tenantId,
    variant: "whats-new",
    config: {
      enabled: conditionsToDisableNotificationCountTrigger(),
    },
  });

  if (!tenantId) {
    Digit.SessionStorage.get("locale") === null
      ? history.push(`/upyog-ui/citizen/select-language`)
      : history.push(`/upyog-ui/citizen/select-location`);
  }

  const appBannerWebObj = uiHomePage?.appBannerDesktop;
  const appBannerMobObj = uiHomePage?.appBannerMobile;
  const citizenServicesObj = uiHomePage?.citizenServicesCard;
  const infoAndUpdatesObj = uiHomePage?.informationAndUpdatesCard;
  const whatsAppBannerWebObj = uiHomePage?.whatsAppBannerDesktop;
  const whatsAppBannerMobObj = uiHomePage?.whatsAppBannerMobile;
  const whatsNewSectionObj = uiHomePage?.whatsNewSection;

  const handleClickOnWhatsAppBanner = (obj) => {
    window.open(obj?.navigationUrl);
  };
  /* set citizen details to enable backward compatiable */
const setCitizenDetail = (userObject, token, tenantId) => {
  let locale = JSON.parse(sessionStorage.getItem("Digit.initData"))?.value?.selectedLanguage;
  localStorage.setItem("Citizen.tenant-id", tenantId);
  localStorage.setItem("tenant-id", tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Citizen.locale", locale);
  localStorage.setItem("token", token);
  localStorage.setItem("Citizen.token", token);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Citizen.user-info", JSON.stringify(userObject));
};

  useEffect(async () => {
    //sessionStorage.setItem("DigiLocker.token1","cf87055822e4aa49b0ba74778518dc400a0277e5")
    if (window.location.href.includes("code")) {
      let code = window.location.href.split("=")[1].split("&")[0]
      let TokenReq = {
        dlReqRef: localStorage.getItem('code_verfier_register'),
        code: code, module: "SSO"

      }
      const { ResponseInfo, UserRequest: info, ...tokens } = await Digit.DigiLockerService.token({ TokenReq })
      setUser({ info, ...tokens });
      setCitizenDetail(info, tokens?.access_token, info?.tenantId)
    }
  }, [])
useEffect(() => {
  if (!user) {
    return;
  }
  Digit.SessionStorage.set("citizen.userRequestObject", user);
  Digit.UserService.setUser(user);
  setCitizenDetail(user?.info, user?.access_token, "pg");
  const redirectPath = location.state?.from || DEFAULT_REDIRECT_URL;
  if (!Digit.ULBService.getCitizenCurrentTenant(true)) {
    history.replace("/upyog-ui/citizen/select-location", {
      redirectBackTo: redirectPath,
    });
  } else {
    history.replace(redirectPath);
  }
}, [user]);
console.log("citizenServicesObjcitizenServicesObj",citizenServicesObj)
  const allCitizenServicesProps = {
    header: t(citizenServicesObj?.headerLabel),
    sideOption: {
      name: t(citizenServicesObj?.sideOption?.name),
      onClick: () => history.push(citizenServicesObj?.sideOption?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
    },
    options: [
      {
        name: t(citizenServicesObj?.props?.[0]?.label),
        Icon: <ComplaintIcon />,
        onClick: () => history.push(citizenServicesObj?.props?.[0]?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
      },
      {
        name: t(citizenServicesObj?.props?.[1]?.label),
        Icon: <PTIcon className="fill-path-primary-main" />,
        onClick: () => history.push(citizenServicesObj?.props?.[1]?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
      },
      {
        name: t(citizenServicesObj?.props?.[2]?.label),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push(citizenServicesObj?.props?.[2]?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
      },
      // {
      //     name: t("ACTION_TEST_WATER_AND_SEWERAGE"),
      //     Icon: <DropIcon/>,
      //     onClick: () => history.push("/upyog-ui/citizen")
      // },
      {
        name: t(citizenServicesObj?.props?.[3]?.label),
        Icon: <WSICon />,
        onClick: () => history.push(citizenServicesObj?.props?.[3]?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
      },
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  const allInfoAndUpdatesProps = {
    header: t(infoAndUpdatesObj?.headerLabel),
    sideOption: {
      name: t(infoAndUpdatesObj?.sideOption?.name),
      onClick: () => history.push(infoAndUpdatesObj?.sideOption?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
    },
    options: [
      {
        name: t(infoAndUpdatesObj?.props?.[0]?.label),
        Icon: <HomeIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[0]?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[1]?.label),
        Icon: <Calender />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[1]?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[2]?.label),
        Icon: <DocumentIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[2]?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
      },
      {
        name: t(infoAndUpdatesObj?.props?.[3]?.label),
        Icon: <DocumentIcon />,
        onClick: () => history.push(infoAndUpdatesObj?.props?.[3]?.navigationUrl.replace("/digit-ui/","/upyog-ui/")),
      },
      // {
      //     name: t("CS_COMMON_HELP"),
      //     Icon: <HelpIcon/>
      // }
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  sessionStorage.removeItem("type" );
  sessionStorage.removeItem("pincode");
  sessionStorage.removeItem("tenantId");
  sessionStorage.removeItem("localityCode");
  sessionStorage.removeItem("landmark"); 
  sessionStorage.removeItem("propertyid");

  return isLoading ? (
    <Loader />
  ) : (
    <div className="HomePageContainer" style={{width:"100%"}}>
      {/* <div className="SideBarStatic">
        <StaticCitizenSideBar />
      </div> */}
      <div className="HomePageWrapper">
        {<div className="BannerWithSearch">
          {isMobile ? <img src={"https://niuatt-filestore.s3.ap-south-1.amazonaws.com/pg/logo/Banner+UPYOG.jpg"} /> : <img src={"https://niuatt-filestore.s3.ap-south-1.amazonaws.com/pg/logo/Banner+UPYOG.jpg"} />}
          {/* <div className="Search">
            <StandaloneSearchBar placeholder={t("CS_COMMON_SEARCH_PLACEHOLDER")} />
          </div> */}
          <div className="ServicesSection">
          <CardBasedOptions style={{marginTop:"-30px"}} {...allCitizenServicesProps} />
          <CardBasedOptions style={isMobile ? {marginTop:"-30px"} : {marginTop:"-30px"}} {...allInfoAndUpdatesProps} />
        </div>
        </div>}


        {(whatsAppBannerMobObj || whatsAppBannerWebObj) && (
          <div className="WhatsAppBanner">
            {isMobile ? (
              <img src={"https://nugp-assets.s3.ap-south-1.amazonaws.com/nugp+asset/Banner+UPYOG+%281920x500%29B+%282%29.jpg"} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerMobObj)} style={{"width":"100%"}}/>
            ) : (
              <img src={"https://nugp-assets.s3.ap-south-1.amazonaws.com/nugp+asset/Banner+UPYOG+%281920x500%29B+%282%29.jpg"} onClick={() => handleClickOnWhatsAppBanner(whatsAppBannerWebObj)} style={{"width":"100%"}}/>
            )}
          </div>
        )}

        {conditionsToDisableNotificationCountTrigger() ? (
          EventsDataLoading ? (
            <Loader />
          ) : (
            <div className="WhatsNewSection">
              <div className="headSection">
                <h2>{t(whatsNewSectionObj?.headerLabel)}</h2>
                <p onClick={() => history.push(whatsNewSectionObj?.sideOption?.navigationUrl)}>{t(whatsNewSectionObj?.sideOption?.name)}</p>
              </div>
              <WhatsNewCard {...EventsData?.[0]} />
            </div>
          )
        ) : null}
        <ChatBot/>
      </div>
    </div>
  );
};

export default Home;
