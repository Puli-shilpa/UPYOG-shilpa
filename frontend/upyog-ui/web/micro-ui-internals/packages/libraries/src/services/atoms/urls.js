const Urls = {
  MDMS: `/egov-mdms-service/v1/_search`,
  MDMSV2: `/mdms-v2/v1/_search`,
  WorkFlow: `/egov-workflow-v2/egov-wf/businessservice/_search`,
  WorkFlowProcessSearch: `/egov-workflow-v2/egov-wf/process/_search`,
  localization: `/localization/messages/v1/_search`,
  location: {
    localities: `/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality`,
    revenue_localities: `/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality`,
    gramPanchayats: `/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=GP`,
  },

  pgr_search: `/pgr-services/v2/request/_search`,
  pgr_update: `/pgr-services/v2/request/_update`,
  filter_data: `https://run.mocky.io/v3/597a50a0-90e5-4a45-b82e-8a2186b760bd`,
  FileStore: "/filestore/v1/files",

  FileFetch: "/filestore/v1/files/url",
  PGR_Create: `/pgr-services/v2/request/_create`,
  pgr_count: `/pgr-services/v2/request/_count`,

  OTP_Send: "/user-otp/v1/_send",
  Authenticate: "/user/oauth/token",
  RegisterUser: "/user/citizen/_create",
  ChangePassword: "/user/password/nologin/_update",
  ChangePassword1: "/user/password/_update",
  UserProfileUpdate: "/user/profile/_update",
  EmployeeSearch: "/egov-hrms/employees/_search",

  InboxSearch: "/inbox/v1/_search",

  UserSearch: "/user/_search",
  UserLogout: "/user/_logout",
  UserCreate:"/user/users/_createnovalidate",

  Shortener: "/egov-url-shortening/shortener",
  employeeDashboardSearch: "/employee-dashboard/_search",

  fsm: {
    search: "/fsm/v1/_search",
    create: "/fsm/v1/_create",
    update: "/fsm/v1/_update",
    vendorSearch: "/vendor/v1/_search",
    vehicleSearch: "/vehicle/v1/_search",
    audit: "/fsm/v1/_audit",
    vehicleTripSearch: "/vehicle/trip/v1/_search",
    billingSlabSearch: "/fsm-calculator/v1/billingSlab/_search",
    vehilceUpdate: "/vehicle/trip/v1/_update",
    createVendor: "/vendor/v1/_create",
    updateVendor: "/vendor/v1/_update",
    createVehicle: "/vehicle/v1/_create",
    updateVehicle: "/vehicle/v1/_update",
    driverSearch: "/vendor/driver/v1/_search",
    createDriver: "/vendor/driver/v1/_create",
    updateDriver: "/vendor/driver/v1/_update",
    vehicleTripCreate: "/vehicle/trip/v1/_create",
    advanceBalanceCalculate: "/fsm-calculator/v1/_advancebalancecalculate",
    workerSearch: "/individual/v1/_search",
  },

  payment: {
    fetch_bill: "/billing-service/bill/v2/_fetchbill",
    demandSearch: "/billing-service/demand/_search",
    create_reciept: "/collection-services/payments/_create",
    print_reciept: "/collection-services/payments",
    generate_pdf: "/pdf-service/v1/_create",
    create_citizen_reciept: "/pg-service/transaction/v1/_create",
    update_citizen_reciept: "/pg-service/transaction/v1/_update",
    search_bill: "/billing-service/bill/v2/_search",
    reciept_search: "/collection-services/payments/:buisnessService/_search",
    obps_Reciept_Search: "/collection-services/payments/_search",
    billAmendmentSearch: "/billing-service/amendment/_search",
    getBulkPdfRecordsDetails: "/pdf-service/v1/_getBulkPdfRecordsDetails",
  },

  pt: {
    fectch_property: "/property-services/property/_search",
    fetch_payment_details: "/billing-service/bill/v2/_fetchbill",
    create: "/property-services/property/_create",
    search: "/property-services/property/_search",
    update: "/property-services/property/_update",
    pt_calculation_estimate: "/pt-calculator-v2/propertytax/v2/_estimate",
    assessment_create: "/property-services/assessment/_create",
    assessment_createUlb:"/pt-calculator-v2/assessment/_jobscheduler",
    assessment_search: "/property-services/assessment/_search",
    payment_search: "/collection-services/payments/PT/_search",
    pt_calculate_mutation: "/pt-calculator-v2/propertytax/mutation/_calculate",
    cfcreate: "/service-request/service/v1/_create",
    cfdefinitionsearch: "/service-request/service/definition/v1/_search",
    cfsearch: "/service-request/service/v1/_search",
    defaulterNotice:"/egov-pdf/download/PT/ptdefaulternotice",
    getDefaulterNoticeStatus:"/pdf-service/v1/_getBulkDefaulterNoticeRecordsDetails"
    
  },

  ptr: {  
    
    create:"/pet-services/pet-registration/_create",
    search:"/pet-services/pet-registration/_search",
    update:"/pet-services/pet-registration/_update",
    fetch_payment_details: "/billing-service/bill/v2/_fetchbill",
    payment_search: "/collection-services/payments/pet-services/_search",
    
  },
  dss: {
    dashboardConfig: "/dashboard-analytics/dashboard/getDashboardConfig",
    getCharts: "/dashboard-analytics/dashboard/getChartV2",
  },

  mcollect: {
    search: "/echallan-services/eChallan/v1/_search",
    create: "/echallan-services/eChallan/v1/_create?",
    fetch_bill: "/billing-service/bill/v2/_fetchbill?",
    search_bill: "/egov-searcher/bill-genie/mcollectbills/_get",
    search_bill_pt: "/egov-searcher/bill-genie/billswithaddranduser/_get",
    update: "/echallan-services/eChallan/v1/_update",
    download_pdf: "/egov-pdf/download/UC/mcollect-challan",
    receipt_download: "/egov-pdf/download/PAYMENT/consolidatedreceipt",
    bill_download: "/egov-pdf/download/BILL/consolidatedbill",
    count: "/echallan-services/eChallan/v1/_count",
  },
  hrms: {
    search: "/egov-hrms/employees/_search",
    count: "/egov-hrms/employees/_count",
    create: "/egov-hrms/employees/_create",
    update: "/egov-hrms/employees/_update",
  },
  tl: {
    create: "/tl-services/v1/_create",
    search: "/tl-services/v1/_search",
    fetch_payment_details: "/billing-service/bill/v2/_fetchbill",
    download_pdf: "/egov-pdf/download/TL/",
    update: "/tl-services/v1/_update",
    billingslab: "/tl-calculator/billingslab/_search",
  },
  receipts: {
    receipt_download: "/egov-pdf/download/PAYMENT/consolidatedreceipt",
    payments: "/collection-services/payments",
    count: "/egov-hrms/employees/_count",
  },
  obps: {
    scrutinyDetails: "/edcr/rest/dcr/scrutinydetails",
    comparisionReport: "/edcr/rest/dcr/occomparison",
    create: "/bpa-services/v1/bpa/_create",
    nocSearch: "/noc-services/v1/noc/_search",
    updateNOC: "/noc-services/v1/noc/_update",
    update: "/bpa-services/v1/bpa/_update",
    bpaSearch: "/bpa-services/v1/bpa/_search",
    bpaRegSearch: "/tl-services/v1/BPAREG/_search",
    bpaRegCreate: "/tl-services/v1/BPAREG/_create",
    bpaRegGetBill: "/tl-calculator/v1/BPAREG/_getbill",
    bpaRegUpdate: "/tl-services/v1/BPAREG/_update",
    receipt_download: "/egov-pdf/download/PAYMENT/consolidatedreceipt",
    edcrreportdownload: "/bpa-services/v1/bpa/_permitorderedcr",
    getSearchDetails: "/inbox/v1/dss/_search",
  },
  edcr: {
    create: "/edcr/rest/dcr/scrutinize",
  },
  preApproved:{
    search: "/bpa-services/v1/preapprovedplan/_search",
    estimate: "/bpa-calculator/_estimate",
  },
  events: {
    search: "/egov-user-event/v1/events/_search",
    update: "/egov-user-event/v1/events/lat/_update",
    updateEvent: "/egov-user-event/v1/events/_update",
    updateEventCDG: "/egov-user-event/v1/events/lat/_update",
    count: "/egov-user-event/v1/events/notifications/_count",
    create: "/egov-user-event/v1/events/_create",
  },

  ws: {
    water_create: "/ws-services/wc/_create",
    sewarage_create: "/sw-services/swc/_create",
    water_search: "/ws-services/wc/_search",
    sewarage_search: "/sw-services/swc/_search",
    wsDemandSearch: "/ws-calculator/waterCalculator/_getConnectionForDemand",
    swDemandSearch: "/sw-calculator/sewerageCalculator/_getConnectionForDemand",
    wsDemandSearchGen: "/ws-calculator/waterCalculator/_generateDemand",
    swDemandSearchGen: "/sw-calculator/sewerageCalculator/_generateDemand",
    water_update: "/ws-services/wc/_update",
    sewarage_update: "/sw-services/swc/_update",
    ws_calculation_estimate: "/ws-calculator/waterCalculator/_estimate",
    sw_calculation_estimate: "/sw-calculator/sewerageCalculator/_estimate",
    ws_connection_search: "/ws-calculator/meterConnection/_search",
    sw_payment_search: "/collection-services/payments/SW/_search",
    ws_payment_search: "/collection-services/payments/WS/_search",
    billAmendmentCreate: "/billing-service/amendment/_create",
    billAmendmentUpdate: "/billing-service/amendment/_update",
    ws_meter_conncetion_create: "/ws-calculator/meterConnection/_create",
    ws_meter_conncetion_bulk_create: "/ws-calculator/meterConnection/_bulkReading",
    sw_meter_conncetion_create: "/sw-calculator/meterConnection/_create",
    wns_group_bill: "/egov-pdf/download/WNS/wnsgroupbill",
    cancel_group_bill: "/pdf-service/v1/_cancelProcess",
    wns_generate_pdf: "/egov-pdf/download/WNS/wnsbill",
    water_applyAdhocTax: "/ws-calculator/waterCalculator/_applyAdhocTax",
    sewerage_applyAdhocTax: "/sw-calculator/sewerageCalculator/_applyAdhocTax",
    getSearchDetails: "/inbox/v1/dss/_search",
    disconnection_notice: "/pdf-service/v1/_createnosave",
    meter_search:"/ws-calculator/meterConnection/_search"
  },

  asset: {
    create: "/asset-services/v1/assets/_create",
    search: "/asset-services/v1/assets/_search",
    update: "/asset-services/v1/assets/_update",
    assign: "/asset-services/v1/assets/assignment/_create",
    depriciationProcess:"/asset-services/v1/assets/depreciation/_process",  //this api for assetDepriciationProcess
    depriciationList:"/asset-services/v1/assets/depreciation/list",   // this api for list of assetDepriciation
    return_asset: "/asset-services/v1/assets/assignment/_update",
    assets_Reciept_Search: "/asset-services/v1/assets/_search",     //This url use for  Assets Recipt Detail QR Code 
    assetDisposedCreate: "/asset-services/v1/disposal/_create"
  },
  ew: {
    create: "/ewaste-services/ewaste-request/_create",
    search: "/ewaste-services/ewaste-request/_search",
    update: "/ewaste-services/ewaste-request/_update",
  },

  sv:{
    create: "/sv-services/street-vending/_create",
    search: "/sv-services/street-vending/_search",
    update: "/sv-services/street-vending/_update",
    deleteDraft:"/sv-services/street-vending/_deletedraft",
  },

  chb: {
    create: "/chb-services/booking/v1/_create",
    search: "/chb-services/booking/v1/_search",
    update: "/chb-services/booking/v1/_update",
    slot_search: "/chb-services/booking/v1/_slot-search",
    estimateCreate: "/chb-services/booking/v1/_estimate"
  },
  ads: {
    create: "/adv-services/booking/v1/_create",
    search: "/adv-services/booking/v1/_search",
    update: "/adv-services/booking/v1/_update",
    slot_search: "/adv-services/booking/v1/_slot-search",
    estimateCreate: "/adv-services/booking/v1/_estimate"

  },

  cm: {
    search: "/verification-service/validity/_search"
  },

digiLocker:{
  authorization:"/requester-services-dx/digilocker/authorization/url",
  register :"/requester-services-dx/digilocker/authorization/url/citizen",
  token:"/requester-services-dx/digilocker/token/citizen",
  issueDoc:"/requester-services-dx/digilocker/issuedfiles",
  uri:"/requester-services-dx/digilocker/file",
  oauth:"/user/digilocker/oauth/token"
},
eSign:{
  pdfUrl:"/requester-services-dx/eSign/process",
  fileStoreSearch:"/requester-services-dx/eSign/filestoreId/v1/_search"
  },
  engagement: {
    document: {
      search: "/egov-document-uploader/egov-du/document/_search",
      create: "/egov-document-uploader/egov-du/document/_create",
      delete: "/egov-document-uploader/egov-du/document/_delete",
      update: "/egov-document-uploader/egov-du/document/_update",
    },
    surveys: {
      create: "/egov-survey-services/egov-ss/survey/_create",
      update: "/egov-survey-services/egov-ss/survey/_update",
      search: "/egov-survey-services/egov-ss/survey/_search",
      delete: "/egov-survey-services/egov-ss/survey/_delete",
      submitResponse: "/egov-survey-services/egov-ss/survey/response/_submit",
      showResults: "/egov-survey-services/egov-ss/survey/response/_results",
      createSurvey: "/service-request/service/definition/v1/_create",
      cfdefinitionsearch: "/service-request/service/definition/v1/_search",
      submitSurveyResponse: "/service-request/service/v1/_create",
      selectedSurveySearch: "/service-request/service/v1/_search",
      updateSurvey:"/service-request/service/definition/v1/_update",
    },
  },

  noc: {
    nocSearch: "/noc-services/v1/noc/_search",
  },
  reports: {
    reportSearch: "/report/",
  },
  bills: {
    cancelBill: "/billing-service/bill/v2/_cancelbill",
  },
  access_control: "/access/v1/actions/mdms/_get",
  billgenie: "/egov-searcher",
  audit: "/inbox/v1/elastic/_search",
};

export default Urls;