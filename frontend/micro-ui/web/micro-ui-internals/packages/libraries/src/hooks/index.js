import { useInitStore } from "./store";
import useWorkflowDetails from "./workflow";
import useSessionStorage from "./useSessionStorage";
import useQueryParams from "./useQueryParams";
import useDocumentSearch from "./useDocumentSearch";
import useClickOutside from "./useClickOutside";
import useAudit from "./core/useAudit";
import {
  useFetchPayment,
  usePaymentUpdate,
  useFetchCitizenBillsForBuissnessService,
  useFetchBillsForBuissnessService,
  useGetPaymentRulesForBusinessServices,
  useDemandSearch,
  useRecieptSearch,
  useRecieptSearchNew,
  useAssetQrCode,
  usePaymentSearch,
  useBulkPdfDetails,
} from "./payment";
import { useUserSearch } from "./userSearch";
import { useApplicationsForBusinessServiceSearch } from "./useApplicationForBillSearch";
import useBoundaryLocalities from "./useLocalities";
import useCommonMDMS from "./useMDMS";
import useCommonMDMSV2 from "./useMDMSV2";
import useCustomMDMS from "./useCustomMDMS";
import useCustomMDMSV2 from "./useCustomMDMSV2";
import useCustomAPIHook from "./useCustomAPIHook";
import useInboxGeneral from "./useInboxGeneral/useInboxGeneral";
import useApplicationStatusGeneral from "./useStatusGeneral";
import useModuleTenants from "./useModuleTenants";
import useStore from "./useStore";
import { useTenants } from "./useTenants";
import useInbox from "./useInbox";
import { useEvents, useClearNotifications, useNotificationCount } from "./events";
import useCreateEvent from "./events/useCreateEvent";
import useUpdateEvent from "./events/useUpdateEvent";
import useNewInboxGeneral from "./useInboxGeneral/useNewInbox";
import useDynamicData from "./useDynamicData";

import useComplaintDetails from "./pgr/useComplaintDetails";
import { useComplaintsList, useComplaintsListByMobile } from "./pgr/useComplaintList";
import useComplaintStatus from "./pgr/useComplaintStatus";
import useComplaintTable from "./pgr/useComplaintTable";
import useComplaintTypes from "./pgr/useComplaintTypes";
import useEmployeeFilter from "./pgr/useEmployeeFilter";
import useInboxData from "./pgr/useInboxData";
import useLocalities from "./pgr/useLocalities";
import useServiceDefs from "./pgr/useServiceDefs";
import usePGRTenants from "./pgr/useTenants";
import usePGRMDMS from "./pgr/useMDMS";
import useComplaintSubType from "./pgr/useComplaintSubType";
import useComplaintStatusCount from "./pgr/useComplaintStatusWithCount";
import useWorkerSearch from "./fsm/useWorkerSearch";

import useTenantsFSM from "./fsm/useTenants";
import useDesludging from "./fsm/useDesludging";
import useApplicationStatus from "./fsm/useApplicationStatus";
import useMDMS from "./fsm/useMDMS";
import useSearch from "./fsm/useSearch";
import useSearchAll from "./fsm/useSearchAll";
import useVehicleSearch from "./fsm/useVehicleSearch";
import useVehicleUpdate from "./fsm/useVehicleUpdate";
import useVehicleTripCreate from "./fsm/useVehicleTripCreate";
import useFSMInbox from "./fsm/useInbox";
import useApplicationUpdate from "./fsm/useApplicationUpdate";
import useWorkflowData from "./fsm/useWorkflowData";
import useRouteSubscription from "./fsm/useRouteSubscription";
import useDsoSearch from "./fsm/useDsoSearch";
import usePropertySearch from "./pt/usePropertySearch";
import usePropertySearchNew from "./pt/usePropertySearchNew";
import usePropertySearchWithDue from "./pt/usePropertySearchWithDue";
import usePropertyPayment from "./pt/usePropertyPayment";
import useApplicationDetail from "./fsm/useApplicationDetail";
import useApplicationActions from "./fsm/useApplicationActions";
import useApplicationAudit from "./fsm/useApplicationAudit";
import useSearchForAuditData from "./fsm/useSearchForAudit";
import useVehiclesSearch from "./fsm/useVehiclesSearch";
import useConfig from "./fsm/useConfig";
import useVendorDetail from "./fsm/useVendorDetail";
import useSlum from "./fsm/useSlum";
import usePaymentHistory from "./fsm/usePaymentHistory";
import useVendorCreate from "./fsm/useVendorCreate";
import useVendorUpdate from "./fsm/useVendorUpdate";
import useVehicleDetails from "./fsm/useVehicleDetails";
import useVehicleCreate from "./fsm/useVehicleCreate";
import useUpdateVehicle from "./fsm/useUpdateVehicle";
import useDriverSearch from "./fsm/useDriverSearch";
import useDriverCreate from "./fsm/useDriverCreate";
import useDriverUpdate from "./fsm/useDriverUpdate";
import useDriverDetails from "./fsm/useDriverDetails";
import useVendorSearch from "./fsm/useVendorSearch";
import useAdvanceBalanceCalulation from "./fsm/useAdvanceBalanceCalculation";

import useEmployeeSearch from "./useEmployeeSearch";

import usePropertyMDMS from "./pt/usePropertyMDMS";
import usePropertyAPI from "./pt/usePropertyAPI";
import usePropertyCreateNUpdateAPI from "./pt/usePropertyCreateNUpdateAPI";
import usePropertyDocumentSearch from "./pt/usePropertyDocumentSearch";
import useTenantsPT from "./pt/useTenants";
import usePtApplicationDetail from "./pt/useApplicationDetail";
import usePtApplicationActions from "./pt/useApplicationActions";
import usePtMDMS from "./pt/useMDMS";
import usePropertyAssessment from "./pt/usePropertyAssessment";
import UseAssessmentCreateUlb from "./pt/UseAssessmentCreateUlb";
import usePtCalculationEstimate from "./pt/usePtCalculationEstimate";
import useGenderMDMS from "./pt/useGenderMDMS";
import usePTGenderMDMS from "./pt/usePTGenderMDMS";
import useMyPropertyPayments from "./pt/useMyPropertyPayments";
import useGenericViewProperty from "./pt/useGenericViewProperty";
import useRatingAndFeedbackMDMS from "./pt/useRatingAndFeedbackMDMS";
import useServiceSearchCF from "./pt/useServiceSearchCF";

import useDssMdms from "./dss/useMDMS";
import useDashboardConfig from "./dss/useDashboardConfig";
import useDSSDashboard from "./dss/useDSSDashboard";
import useGetChart from "./dss/useGetChart";

import useMCollectMDMS from "./mcollect/useMCollectMDMS";
import useMCollectSearch from "./mcollect/useMCollectSearch";
import useMcollectSearchBill from "./mcollect/useMcollectSearchBill";
import usemcollectTenants from "./mcollect/useTenants";
import useMCollectCount from "./mcollect/useMCollectCount";
import useMCollectCategory from "./mcollect/useMcollectCategory";
import useMCollectCategoryTypes from "./mcollect/useMcollectCategoryTypes";
import useMCollectTaxHeads from "./mcollect/useMcollectTaxHeads";
import useMcollectFormConfig from "./mcollect/useMcollectFormConfig";

import useTenantsTL from "./tl/useTenants";
import useTradeLicenseMDMS from "./tl/useTradeLicenseMDMS";
import useTLDocumentSearch from "./tl/useTLDocumentSearch";
import useTradeLicenseAPI from "./tl/useTradeLicenseAPI";
import useTradeLicenseSearch from "./tl/useTradeLicenseSearch";
import { useTLSearchApplication, useTLApplicationDetails } from "./tl/useTLsearchApplication";
import useTLPaymentHistory from "./tl/userPaymentHistory";
import useTLApplicationDetail from "./tl/useApplicationDetail";
import useTLApplicationActions from "./tl/useApplicationActions";
import useTLFetchBill from "./tl/useFetchBill";

import useTLGenderMDMS from "./tl/useTLGenderMDMS";
import useTLInbox from "./tl/useInbox";
import useTradeLicenseBillingslab from "./tl/useTradeLicenseBillingslab";
import useTLMDMS from "./tl/useMDMS";
import useTLSearch from "./tl/useSearch";
import useTLWorkflowData from "./tl/useTLWorkflowData";

import useHRMSSearch from "./hrms/useHRMSsearch";
import useHrmsMDMS from "./hrms/useHRMSMDMS";
import useHRMSCreate from "./hrms/useHRMScreate";
import useHRMSUpdate from "./hrms/useHRMSUpdate";
import useHRMSCount from "./hrms/useHRMSCount";
import useHRMSGenderMDMS from "./hrms/useHRMSGender";

import useReceiptsSearch from "./receipts/useReceiptsSearch";
import useReceiptsMDMS from "./receipts/useReceiptsMDMS";
import useReceiptsUpdate from "./receipts/useReceiptsUpdate";

import SearchMdmsTypes from "./obps/SearchMdmsTypes";
import useOBPSMDMS from "./obps/useMDMS";
import useOBPSSearch from "./obps/useOBPSSearch";
import useScrutinyDetails from "./obps/useScrutinyDetails";
import usePreApprovedSearch from "./obps/usePreApprovedSearch";
import useTenantsOBPS from "./obps/useTenants";
import useNocDetails from "./obps/useNocDetails";
import useNOCApplicationActions from "./noc/useNOCApplicationActions";
import useOBPSDocumentSearch from "./obps/useOBPSDocumentSearch";
import useObpsAPI from "./obps/useObpsAPI";
import useBPADetails from "./obps/useBPADetails";
import useBPASearch from "./obps/useBPASearch";
import { useBPAREGgetbill } from "./obps/useBPAREGgetbill";
import useStakeholderAPI from "./obps/useStakeholderAPI";
import useOCEdcrSearch from "./obps/useOCEdcrSearch";
import useLicenseDetails from "./obps/useLicenseDetails";
import useBPAREGApplicationActions from "./obps/useBPAREGApplicationActions";
import useBPADetailsPage from "./obps/useBPADetailsPage";
import useBPAInbox from "./obps/useBPAInbox";
import useEDCRInbox from "./obps/useEDCRInbox";
import useBPAApplicationActions from "./obps/useApplicationActions";
import useArchitectInbox from "./obps/useArchitectInbox";
import useBPAREGSearch from "./obps/useBPAREGSearch";
import useEmpBPAREGSearch from "./obps/useEmpBPAREGSearch";
import useServiceTypeFromApplicationType from "./obps/useServiceTypeFromApplicationType";
import useBusinessServiceBasedOnServiceType from "./obps/useBusinessServiceBasedOnServiceType";
import useBusinessServiceData from "./obps/useBusinessServiceData";
import useBPATaxDocuments from "./obps/useBPATaxDocuments";

import useEventInbox from "./events/useEventInbox";
import useEventDetails from "./events/useEventDetails";
import { useEngagementMDMS } from "./engagement/useMdms";
import useDocSearch from "./engagement/useSearch";
import useDocCreate from "./engagement/useCreate";
import useDocUpdate from "./engagement/useUpdate";
import useDocDelete from "./engagement/useDelete";

import useSurveyCreate from "./surveys/useCreate";
import useSurveyDelete from "./surveys/useDelete";
import useSurveyUpdate from "./surveys/useUpdate";
import useSurveySearch from "./surveys/useSearch";
import useSurveyShowResults from "./surveys/useShowResults";
import useSurveySubmitResponse from "./surveys/useSubmitResponse";
import useSurveyInbox from "./surveys/useSurveyInbox";
import useServeyCreateDef from "./surveys/useCreateSurvey";
import useCfdefinitionsearch from "./surveys/useCfdefinitionsearch";
import useSubmitSurveyResponse from "./surveys/useSubmitSurveyResponse";
import useSelectedSurveySearch from "./surveys/useSelectedSurveySearch";
import useCfdefinitionsearchresult from "./surveys/useCfdefinitionsearchresult";
import useUpdateSurvey from "./surveys/useSurveyUpdate";

import useNOCDetails from "./noc/useNOCDetails";
import useNOCInbox from "./noc/useInbox";
import useNOCSearchApplication from "./noc/useSearchApplications";

import WSSearchMdmsTypes from "./ws/WSSearchMdmsTypes";
import usewsTenants from "./ws/useTenants";
import useWaterSearch from "./ws/useWaterSearch";
import useSewarageSearch from "./ws/useSewarageSearch";
import useMyBillsWaterSearch from "./ws/useMyBillsWaterSearch";
import useMyBillsSewarageSearch from "./ws/useMyBillsSewarageSearch";
import useMyApplicationSearch from "./ws/useMyApplicationSearch";
import useWSDocumentSearch from "./ws/useWSDocumentSearch";
import useWSMDMSWS from "./ws/useWSMDMSWS";
import WSuseSearch from "./ws/useSearch";
import useOldValue from "./ws/useOldValue";
import useSewSearch from "./ws/useSewSearch";
import useSearchWS from "./ws/useSearchWS";
import useBulkSearchWS from "./ws/useBulkSearchWS"
import useMypaymentWS from "./ws/useMypaymentWS";
import useWSDetailsPage from "./ws/useWSDetailsPage";
import useWSApplicationActions from "./ws/useApplicationActions";
import useApplicationActionsBillAmendUpdate from "./ws/useApplicationActionsBillAmendUpdate";
import useWSConsumptionSearch from "./ws/useConsumptionSearch";
import useWSMDMS from "./ws/useWSMDMS";
import useAccessControl from "./useAccessControl";
import useConnectionDetail from "./ws/useConnectionDetail";
import useBillSearch from "./bills/useBillSearch";
import useCancelBill from "./bills/useCancelBill";
import useWaterCreateAPI from "./ws/useWaterCreateAPI";
import useSewerageCreateAPI from "./ws/useSewerageCreateAPI";
import useWSUpdateAPI from "./ws/useWSUpdateAPI";
import useCreateBillAmendment from "./ws/useCreateBillAmendment";
import useWSApplicationDetailsBillAmendment from "./ws/useWSApplicationDetailsBillAmendment";
import useWSInbox from "./ws/useInbox";
import useTenantsBills from "./bills/useTenants";
import useMeterReadingCreateAPI from "./ws/useMeterConnectionCreateAPI";
import useGetMeterStatusList from "./ws/useGetMeterStatusList";
import useGetBillingPeriodValidation from "./ws/useBillingPeriodValidation";
import useReportMeta from "./reports/useReport";
import useWaterPropertySearch from "./ws/useWaterPropertySearch";
import useDisconnectionWorkflow from "./ws/useDisconnectionWorkflow";
import useDisConnectionDetails from "./ws/useDisConnectionDetails";
import useWSModifyDetailsPage from "./ws/useWSModifyDetailsPage";
import useBulkMeterReadingCreateAPI from "./ws/useBulkMeterCreate";

import useGetHowItWorksJSON from "./useHowItWorksJSON";
import useGetFAQsJSON from "./useGetFAQsJSON";
import useGetDSSFAQsJSON from "./useGetDSSFAQsJSON";
import useGetDSSAboutJSON from "./useGetDSSAboutJSON";
import useStaticData from "./useStaticData";
import useBillAmendmentInbox from "./billAmendment/useInbox";
import { usePrivacyContext } from "./usePrivacyContext";
import useToCheckPrivacyEnablement from "./ws/useToCheckPrivacyEnablement";
import useWSConfigMDMS from "./ws/useWSConfigMDMS";
import useFeedBackSearch from "./useFeedBackSearch";

import usePetMDMS from "./ptr/usePetMDMS";
import useBreedTypeMDMS from "./ptr/useBreedTypeMDMS";
import usePTRCreateAPI from "./ptr/usePTRCreateAPI";
import usePTRPetMDMS from "./ptr/usePTRPetMDMS";
import usePTRGenderMDMS from "./ptr/usePTRGenderMDMS";
import usePTRSearch from "./ptr/usePTRSearch";
import usePtrApplicationDetail from "./ptr/usePtrApplicationDetail";
import usePTRApplicationAction from "./ptr/usePTRApplicationAction";
import useServiceSearchPTR from "./ptr/useServiceSearchPTR";
import usePetDocumentSearch from "./ptr/usePetDocumentSearch";
import useMyPetPayments from "./ptr/useMyPetPayments";
import useTenantsPTR from "./ptr/useTenants";
//adding asset hooks here
import useAssetClassification from "./asset/useAssetClassification";
import useAssetType from "./asset/useAssetType";
import useAssetDocumentsMDMS from "./asset/useAssetDocumentsMDMS";
import useAssetSubType from "./asset/useAssetSubType";
import useAssetdetail from "./asset/useAssetdetail";
import useAssetCreateAPI from "./asset/useAssetCreateAPI";
import useAssetApplicationDetail from "./asset/useAssetApplicationDetail";
import useASSETSearch from "./asset/useASSETSearch";
import useTenantsASSET from "./asset/useTenants"
import useASSETApplicationAction from "./asset/useASSETApplicationAction";
import useAssetparentSubType from "./asset/useAssetparentSubType";
import useAssignCreateAPI from "./asset/useAssignCreateAPI";
import useReturnAPI from "./asset/useReturnAPI";
import useEditUpdateAPI from "./asset/useEditUpdateAPI";

import createTokenAPI from "./digiLockerApi/createTokenAPI";

import useSVDoc from "./sv/useSVDoc";
import useSvCreateApi from "./sv/useSvCreateApi";
import useTenantsSV from "./sv/useTenants";
import useADSSlotSearch from "./ads/useADSSlotSearch";
import useADSSearch from "./ads/useADSSearch";
import useSVApplicationDetail from "./sv/useSVApplicationDetail";
import useSvSearchApplication from "./sv/useSvSearchApplication";
import useSVApplicationAction from "./sv/useSVApplicationAction";
import useADSApplicationDetail from "./ads/useADSApplicationDetail";
import useProductPriceMDMS from "./ew/useProductPriceMDMS";
import useSpecialCategory from "./chb/useSpecialCategory";
import useResidentType from "./chb/useResidentType";
import usePurpose from "./chb/usePurpose";
import useChbCreateAPI from "./chb/useChbCreateAPI";
import useADSCreateAPI from "./ads/useADSCreateAPI";
import useChbDocumentsMDMS from "./chb/useChbDocumentsMDMS";
import useEWCreateAPI from "./ew/useEWCreateAPI";
import useTenantsEW from "./ew/useTenants";
import useEWSearch from "./ew/useEWSearch";
import useEwApplicationDetail from "./ew/useEwApplicationDetail";
import useEWApplicationAction from "./ew/useEWApplicationAction";

import useChbDocumentSearch from "./chb/useChbDocumentSearch";
import useChbApplicationDetail from "./chb/useChbApplicationDetail";
import useChbSearch from "./chb/useChbSearch";
import useTenantsCHB from "./chb/useTenants";
import useChbApplicationAction from "./chb/useChbApplicationAction";
import useServiceSearchCHB from "./chb/useServiceSearchCHB";
import useChbCommunityHalls from "./chb/useChbCommunityHalls";
import useChbHallCode from "./chb/useChbHallCode"
import useChbSlotSearch from "./chb/useChbSlotSearch";
import useDemandEstimation from "./chb/useDemandEstimation"
import useTenantsADS from "./ads/useTenants"
import useADSDocumentsMDMS from "./ads/useADSDocumentsMDMS";
import useADSDocumentSearch from "./ads/useADSDocumentSearch";
import useADSDemandEstimation from "./ads/useADSDemandEstimation"
import useCMSearch from "./cm/useCMSearch";

const pgr = {
  useComplaintDetails,
  useComplaintsList,
  useComplaintsListByMobile,
  useComplaintStatus,
  useComplaintTable,
  useComplaintTypes,
  useEmployeeFilter,
  useInboxData,
  useLocalities,
  useServiceDefs,
  useTenants: usePGRTenants,
  useComplaintSubType,
  usePropertyMDMS,
  useComplaintStatusCount,
  useTradeLicenseBillingslab,
  useMDMS: usePGRMDMS,
};


const fsm = {
  useTenants: useTenantsFSM,
  useDesludging: useDesludging,
  useMDMS: useMDMS,
  useSearch,
  useRouteSubscription,
  useSearchAll,
  useInbox: useFSMInbox,
  useApplicationUpdate,
  useApplicationStatus,
  useWorkflowData,
  useDsoSearch,
  useApplicationDetail,
  useApplicationActions,
  useApplicationAudit,
  useSearchForAuditData,
  useVehicleSearch,
  useVehicleUpdate,
  useVendorDetail,
  useVehiclesSearch,
  useConfig,
  useSlum,
  usePaymentHistory,
  useVendorCreate,
  useVendorUpdate,
  useVehicleDetails,
  useVehicleCreate,
  useVendorCreate,
  useVendorUpdate,
  useVehicleDetails,
  useVehicleCreate,
  useUpdateVehicle,
  useDriverSearch,
  useDriverCreate,
  useDriverUpdate,
  useDriverDetails,
  useVehicleTripCreate,
  useVendorSearch,
  useAdvanceBalanceCalulation,
  useWorkerSearch
};
const ptr = {
  usePetMDMS,
  usePTRPetMDMS,
  useBreedTypeMDMS,
  usePTRCreateAPI,
  usePTRApplicationAction,
  usePTRGenderMDMS,
  usePTRSearch,
  usePtrApplicationDetail,
  // useTenantsPTR,
  useServiceSearchPTR,
  usePetDocumentSearch,
  useMyPetPayments,
  useTenants: useTenantsPTR
 
};

const pt = {
  usePropertySearch,
  usePropertySearchNew,
  usePropertyPayment,
  usePropertyMDMS,
  usePropertySearchWithDue,
  usePropertyAPI,
  usePropertyCreateNUpdateAPI,
  usePropertyDocumentSearch,
  useTenants: useTenantsPT,
  useApplicationDetail: usePtApplicationDetail,
  useApplicationActions: usePtApplicationActions,
  useMDMS: usePtMDMS,
  usePropertyAssessment,
  UseAssessmentCreateUlb,
  usePtCalculationEstimate,
  useGenderMDMS,
  usePTGenderMDMS,
  useMyPropertyPayments,
  useGenericViewProperty,
  useRatingAndFeedbackMDMS,
  useServiceSearchCF,
};
const dss = {
  useMDMS: useDssMdms,
  useDashboardConfig,
  useDSSDashboard,
  useGetChart,
};

const mcollect = {
  useCommonMDMS,
  useMCollectMDMS,
  useMCollectSearch,
  useMcollectSearchBill,
  usemcollectTenants,
  useMCollectCount,
  useMCollectCategory,
  useMCollectCategoryTypes,
  useMCollectTaxHeads,
  useMcollectFormConfig,
};

const hrms = {
  useHRMSSearch,
  useHrmsMDMS,
  useHRMSCreate,
  useHRMSUpdate,
  useHRMSCount,
  useHRMSGenderMDMS,
};
const tl = {
  useTenants: useTenantsTL,
  useTradeLicenseMDMS,
  useTLDocumentSearch,
  useTradeLicenseAPI,
  useTLSearchApplication,
  useTLPaymentHistory,
  useTradeLicenseSearch,
  useTLGenderMDMS,
  useTradeLicenseBillingslab,
  useInbox: useTLInbox,
  useMDMS: useTLMDMS,
  useSearch: useTLSearch,
  useApplicationDetail: useTLApplicationDetail,
  useApplicationActions: useTLApplicationActions,
  useFetchBill: useTLFetchBill,
  useTLApplicationDetails,
  useTLWorkflowData,
};

const receipts = {
  useReceiptsMDMS,
  useReceiptsSearch,
  useReceiptsUpdate,
};

const obps = {
  useMDMS: useOBPSMDMS,
  useScrutinyDetails,
  usePreApprovedSearch,
  useTenants: useTenantsOBPS,
  useNocDetails: useNocDetails,
  useOBPSDocumentSearch,
  useObpsAPI,
  useBPADetails,
  useBPASearch,
  useBPAREGgetbill,
  useStakeholderAPI,
  useBPAREGSearch,
  useOCEdcrSearch,
  useLicenseDetails,
  useBPAREGApplicationActions,
  useBPADetailsPage,
  useEmpBPAREGSearch,
  useBPAInbox,
  useEDCRInbox,
  useArchitectInbox,
  SearchMdmsTypes,
  useServiceTypeFromApplicationType,
  useApplicationActions: useBPAApplicationActions,
  useOBPSSearch,
  useBusinessServiceBasedOnServiceType,
  useBusinessServiceData,
  useBPATaxDocuments,
};

const events = {
  useInbox: useEventInbox,
  useCreateEvent,
  useEventDetails,
  useUpdateEvent,
};

const engagement = {
  useMDMS: useEngagementMDMS,
  useDocCreate,
  useDocSearch,
  useDocDelete,
  useDocUpdate,
};

const survey = {
  useCreate: useSurveyCreate,
  useUpdate: useSurveyUpdate,
  useDelete: useSurveyDelete,
  useSearch: useSurveySearch,
  useSubmitResponse: useSurveySubmitResponse,
  useShowResults: useSurveyShowResults,
  useSurveyInbox,
  useServeyCreateDef:useServeyCreateDef,
  useCfdefinitionsearch:useCfdefinitionsearch,
  useSubmitSurveyResponse:useSubmitSurveyResponse,
  useSelectedSurveySearch:useSelectedSurveySearch,
  useCfdefinitionsearchresult:useCfdefinitionsearchresult,
  useUpdateSurvey:useUpdateSurvey,
};

const noc = {
  useNOCDetails,
  useNOCApplicationActions,
  useInbox: useNOCInbox,
  useNOCSearchApplication,
};

const ws = {
  WSSearchMdmsTypes,
  usewsTenants,
  useWaterSearch,
  useSewarageSearch,
  useMyBillsWaterSearch,
  useMyBillsSewarageSearch,
  useMyApplicationSearch,
  useWSDocumentSearch,
  useWSMDMSWS,
  WSuseSearch,
  useSewSearch,
  useSearchWS,
  useBulkSearchWS,
  useWSDetailsPage,
  useWSApplicationActions,
  useApplicationActionsBillAmendUpdate,
  useWSConsumptionSearch,
  useConnectionDetail,
  useMDMS: useWSMDMS,
  useWaterCreateAPI,
  useSewerageCreateAPI,
  useWSUpdateAPI,
  useMypaymentWS,
  useCreateBillAmendment,
  useWSApplicationDetailsBillAmendment,
  useInbox: useWSInbox,
  useOldValue,
  useMeterReadingCreateAPI,
  useGetMeterStatusList,
  useGetBillingPeriodValidation,
  useWaterPropertySearch,
  useDisconnectionWorkflow,
  useDisConnectionDetails,
  useWSModifyDetailsPage,
  useToCheckPrivacyEnablement,
  useBulkMeterReadingCreateAPI,
  useWSConfigMDMS: useWSConfigMDMS,
};

const reports = {
  useReportMeta,
};
const asset = {
  useAssetClassification,
  useAssetType,
  useAssetDocumentsMDMS,
  useAssetSubType,
  useAssetdetail,
  useAssetCreateAPI,
  useAssetApplicationDetail,
  useASSETApplicationAction,
  useASSETSearch,
  useAssetparentSubType,
  useTenants: useTenantsASSET,
  useAssignCreateAPI,
  useReturnAPI,
  useEditUpdateAPI
};

const sv = {
  useSVDoc,
  useSvCreateApi,
  useTenants:useTenantsSV,
  useSvSearchApplication,
  useSVApplicationDetail,
  useSVApplicationAction,
  useSvSearchApplication
}

const ew = {
  useProductPriceMDMS,
  useEWCreateAPI,
  useTenants: useTenantsEW,
  useEWSearch,
  useEwApplicationDetail,
  useEWApplicationAction,
};

const chb={
  useSpecialCategory,
  useResidentType,
  usePurpose,
  useChbCreateAPI,
  useChbDocumentsMDMS,
  useChbDocumentSearch,
  useChbApplicationDetail,
  useChbSearch,
  useTenants:useTenantsCHB,
  useChbApplicationAction,
  useServiceSearchCHB,
  useChbCommunityHalls,
  useChbHallCode,
  useChbSlotSearch,
  useDemandEstimation
}
// for using tenant for city and document and search 
const ads={
  useTenants:useTenantsADS,
  useADSDocumentsMDMS,
  useADSDocumentSearch,
  useADSCreateAPI,
  useADSSlotSearch,
  useADSSearch,
  useADSDemandEstimation,
  useADSApplicationDetail  
}

const cm = {
  useCMSearch
}

const Hooks = {
  useSessionStorage,
  useQueryParams,
  useFetchPayment,
  useAssetQrCode,
  usePaymentUpdate,
  useFetchCitizenBillsForBuissnessService,
  useFetchBillsForBuissnessService,
  useGetPaymentRulesForBusinessServices,
  useWorkflowDetails,
  useInitStore,
  useClickOutside,
  useUserSearch,
  useApplicationsForBusinessServiceSearch,
  useDemandSearch,
  useInboxGeneral,
  useEmployeeSearch,
  useBoundaryLocalities,
  useCommonMDMS,
  useCommonMDMSV2,
  useApplicationStatusGeneral,
  useModuleTenants,
  useRecieptSearch,
  useRecieptSearchNew,
  usePaymentSearch,
  useNewInboxGeneral,
  useEvents,
  useClearNotifications,
  useNotificationCount,
  useStore,
  useDocumentSearch,
  useTenants,
  useInbox: useTLInbox,
  useFeedBackSearch,
  useAccessControl,
  useBillSearch,
  useCancelBill,
  useTenantsBills,
  usePrivacyContext,
  pgr,
  fsm,
  pt,
  ptr,
  dss,
  mcollect,
  hrms,
  tl,
  receipts,
  obps,
  events,
  engagement,
  survey,
  noc,
  ws,
  useCustomMDMS,
  useCustomMDMSV2,
  useCustomAPIHook,
  reports,
  useGetHowItWorksJSON,
  useGetFAQsJSON,
  useGetDSSFAQsJSON,
  useGetDSSAboutJSON,
  useStaticData,
  useDynamicData,
  useBulkPdfDetails,
  useBillAmendmentInbox,
  useAudit,
  createTokenAPI,
  asset,
  sv,
  chb,
  ads,
  ew,
  cm
};

export default Hooks;