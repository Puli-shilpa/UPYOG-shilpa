import React, { useEffect, useState } from "react";
import { FormStep, TextInput, CardLabel, RadioButtons,RadioOrSelect, LabelFieldPair, Dropdown, CheckBox, LinkButton, Loader, Toast, SearchIcon, DeleteIcon } from "@upyog/digit-ui-react-components";
import { stringReplaceAll, getPattern, convertDateTimeToEpoch, convertDateToEpoch } from "../utils";
import Timeline from "../components/Timeline";
import cloneDeep from "lodash/cloneDeep";
import { PTService } from "../../../../libraries/src/services/elements/PT";

const OwnerDetails = ({ t, config, onSelect, userType, formData }) => {
    let validation = {};
    sessionStorage.removeItem("currentPincode");
    let isedittrade = window.location.href.includes("edit-application");
    let isrenewtrade = window.location.href.includes("renew-trade");
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const stateId = Digit.ULBService.getStateId();
    const [canmovenext, setCanmovenext] = useState(isedittrade || isrenewtrade ? false : true);
    const [ownershipCategoryList, setOwnershipCategoryList] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [ownershipCategory, setOwnershipCategory] = useState(formData?.owners?.ownershipCategory);
    const [name, setName] = useState(formData?.owners?.name || "");
    const [isPrimaryOwner, setisPrimaryOwner] = useState(false);
    const [gender, setGender] = useState(!formData?.owners?.gender?.i18nKey ? {
        code: formData?.owners?.gender || "", 
        active: formData?.owners?.gender ? true : false, 
        i18nKey: formData?.owners?.gender ? `COMMON_GENDER_${formData?.owners?.gender}` : ""
    }:formData?.owners?.gender);
    const [mobileNumber, setMobileNumber] = useState(formData?.owners?.mobileNumber || "");
    const [emailId, setEmail] = useState(formData?.owners?.emailId || "");
    const [showToast, setShowToast] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [ownerRoleCheck, setownerRoleCheck] = useState({});
    let Webview = !Digit.Utils.browser.isMobile();
    const checkingFlow = formData?.uiFlow?.flow ? formData?.uiFlow?.flow :formData?.selectedPlot||formData?.businessService==="BPA-PAP"    ? "PRE_APPROVE":"";
    const ismultiple = ownershipCategory?.code.includes("MULTIPLEOWNERS") ? true : false;
    formData?.owners?.owners?.forEach(owner => {
        if(owner.isPrimaryOwner == "false" ) owner.isPrimaryOwner = false
    })
    let [fields, setFeilds] = useState(() => {
        const owners = formData?.owners?.owners || [{ name: "", gender: "", mobileNumber: null, isPrimaryOwner: true }];
        return owners.map(owner => ({
          ...owner,
          gender: typeof owner.gender === 'object' ? owner.gender : { value: owner.gender }
        }));
      });

    useEffect(() => {
        var flag=0;
        fields?.map((ob) => {
            if(ob?.isPrimaryOwner)
            flag=1;
            if (ob?.name && ob?.mobileNumber && ob?.gender) {
                setCanmovenext(false);
            }
            else {
                setCanmovenext(true);
            }
        })
        console.log("fields",fields,canmovenext,ownershipCategory)
        if(!canmovenext && ownershipCategory && !(ownershipCategory?.code.includes("SINGLEOWNER")))
        {
            if(flag==1)
            setCanmovenext(false);
            else
            setCanmovenext(true);
        }
    }, [fields])
    const validateEmail=(value)=>{
        const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-z.-]+\.(com|org|in)$/;
        if(value===""){
          setError("");
        }
        else if(emailPattern.test(value)){
          setError("");
        }
        else{
          setError(t("CORE_INVALID_EMAIL_ID_PATTERN"));
        }
      }

    useEffect(() => {
        const values = cloneDeep(fields);
        if (ownershipCategory && !ismultiple && values?.length > 1) setFeilds([{...values[0],isPrimaryOwner:true}]);
    }, [ownershipCategory])

    const { isLoading, data: ownerShipCategories } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["OwnerShipCategory"]);
    const { data: genderTypeData } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["GenderType"]);

    useEffect(() => {
        const ownershipCategoryLists = ownerShipCategories?.["common-masters"]?.OwnerShipCategory;
        if (ownershipCategoryLists && ownershipCategoryLists?.length > 0) {
            const finalOwnershipCategoryList = ownershipCategoryLists.filter(data => data?.code?.includes("INDIVIDUAL"));
            finalOwnershipCategoryList.forEach(data => {
                data.i18nKey = `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(data?.code, ".", "_")}`
            });
            setOwnershipCategoryList(finalOwnershipCategoryList);
        }
    }, [ownerShipCategories]);


    useEffect(() => {
        const gendeTypeMenu = genderTypeData?.["common-masters"]?.GenderType || [];
        if (gendeTypeMenu && gendeTypeMenu?.length > 0) {
            const genderFilterTypeMenu = gendeTypeMenu.filter(data => data.active);
            genderFilterTypeMenu.forEach(data => {
                data.i18nKey = `COMMON_GENDER_${data.code}`;
            });
            setGenderList(genderFilterTypeMenu)
        }
    }, [genderTypeData]);

    // useEffect(() => {
    //     if(showToast) {
    //         setTimeout(closeToast, 5000);
    //     }
    // },[showToast]);

    function selectedValue(value) {
        setOwnershipCategory(value);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ name: "", gender: "", mobileNumber: null, isPrimaryOwner: false });
        setFeilds(values);
        setCanmovenext(true);

    }

    function handleRemove(index) {
        const values = [...fields];
        if (values.length != 1) {
            values.splice(index, 1);
            if(values.length == 1)
            {
                values[0] = {...values[0], isPrimaryOwner:true}
            }
            setFeilds(values);
        }

    }

    function setOwnerName(i, e) {
        let units = [...fields];
        units[i].name = e.target.value;
        setName(e.target.value);
        setFeilds(units);
        if (units[i].gender && units[i].mobileNumber && units[i].name) {
            setCanmovenext(false);
        }
    }
    function setOwnerEmail(i, e) {
        let units = [...fields];
        units[i].emailId = e.target.value;
        setEmail(e.target.value);
        setFeilds(units);
        if (units[i].gender && units[i].mobileNumber && units[i].name) {
            setCanmovenext(false);
        }
    }   
    const handleEmailChange=(i, e)=>{
        const value=e.target.value;
        let units = [...fields];
        units[i].emailId = value;
        setEmail(value);
        setFeilds(units);
        validateEmail(value);
        if (units[i].gender && units[i].mobileNumber && units[i].name ) {
            setCanmovenext(false);
        }
    }
    useEffect(() => {
        if(emailId){
          validateEmail(emailId);
        }
    }, [emailId])
    function setGenderName(i, value) {
        let units = [...fields];
        units[i].gender = value;
        setGender(value);
        setFeilds(units);
        if (units[i].gender && units[i].mobileNumber && units[i].name) {
            setCanmovenext(false);
        }
    }
    function setMobileNo(i, e) {
        let units = [...fields];
        units[i].mobileNumber = e.target.value;
        setMobileNumber(e.target.value);
        setFeilds(units);
        if (units[i].gender && units[i].mobileNumber && units[i].name) {
            setCanmovenext(false);
        }
    }
    function setPrimaryOwner(i, e) {
        let units = [...fields];
        units.map((units) => {
            units.isPrimaryOwner = false;
        });
        units[i].isPrimaryOwner = ismultiple ? e.target.checked : true;
        setisPrimaryOwner(e.target.checked);
        setFeilds(units);
        console.log("units",units)
    }
    const [error, setError] = useState(null);


    function getusageCategoryAPI(arr){
        let usageCat = ""
        arr.map((ob,i) => {
            usageCat = usageCat + (i !==0?",":"") + ob.code;
        });
        return usageCat;
    }

    function getUnitsForAPI(subOccupancyData){
        const ob = subOccupancyData?.subOccupancy;
        const blocksDetails = subOccupancyData?.data?.edcrDetails?.planDetail?.blocks || [];
        let units=[];
        if(ob) {
            let result = Object.entries(ob);
            result.map((unit,index)=>{
                units.push({
                    blockIndex:index,
                    floorNo:unit[0].split("_")[1],
                    unitType:"Block",
                    occupancyType: blocksDetails?.[index]?.building?.occupancies?.[0]?.typeHelper?.type?.code || "A", 
                    usageCategory:getusageCategoryAPI(unit[1]),
                });
            })
        }
        return units;
    }

    function getBlockIds(arr){
        let blockId = {};
        arr.map((ob,ind)=>{
            blockId[`Block_${ob.floorNo}`]=ob.id;
        });
        return blockId;
    }

    const closeToast = () => {
        setShowToast(null);
      };

    const getOwnerDetails = async (indexValue, eData) => {
        const ownersCopy = cloneDeep(fields);
        const ownerNo = ownersCopy?.[indexValue]?.mobileNumber || "";
        setShowToast(null);


        if (!ownerNo.match(getPattern("MobileNo"))) {
            setShowToast({ key: "true", error: true, message: "ERR_MOBILE_NUMBER_INCORRECT" });
            return;
        }

        if (ownerNo === ownersCopy?.[indexValue]?.userName) {
            setShowToast({ key: "true", error: true, message: "ERR_OWNER_ALREADY_ADDED_TOGGLE_MSG" });
            return;
        }

        const matchingOwnerIndex = ownersCopy.findIndex(item => item.userName === ownerNo);

       
            const usersResponse = await Digit.UserService.userSearch(Digit.ULBService.getStateId(), { userName: fields?.[indexValue]?.mobileNumber }, {});
            let found = usersResponse?.user?.[0]?.roles?.filter(el => el.code === "BPA_ARCHITECT" || el.code === "BPA_SUPERVISOR")?.[0];
            if (usersResponse?.user?.length === 0) {
                setShowToast({ key: "true", warning: true, message: "ERR_MOBILE_NUMBER_NOT_REGISTERED" });
                return;
            } else {
                const userData = usersResponse?.user?.[0];
                userData.gender = userData.gender ? { code: userData.gender, active: true, i18nKey: `COMMON_GENDER_${userData.gender}` } : "";
                if(userData?.dob) userData.dob = convertDateToEpoch(userData?.dob);
                if (userData?.createdDate) {
                    userData.createdDate = convertDateTimeToEpoch(userData?.createdDate);
                    userData.lastModifiedDate = convertDateTimeToEpoch(userData?.lastModifiedDate);
                    userData.pwdExpiryDate = convertDateTimeToEpoch(userData?.pwdExpiryDate);
                  }

                let values = [...ownersCopy];
                if (values[indexValue]) { values[indexValue] = userData; values[indexValue].isPrimaryOwner = fields[indexValue]?.isPrimaryOwner || false; }
                setFeilds(values);
                if(values[indexValue]?.mobileNumber && values[indexValue]?.name && values[indexValue]?.gender?.code) setCanmovenext(true);
                else setCanmovenext(false);

                // if(found){
                //     setCanmovenext(false);
                //     setownerRoleCheck(found);
                //     setShowToast({ key: "true", error: true, message: `BPA_OWNER_VALIDATION_${found?.code}` });
                //     return;
                // }
             }
        
    }

    const getUserData = async (data,tenant) => {
        let flag = false;
        let userresponse = [];
        userresponse = fields?.map((ob,indexValue) => {
            return Digit.UserService.userSearch(Digit.ULBService.getStateId(), { userName: fields?.[indexValue]?.mobileNumber }, {}).then((ob) => {return ob})
        })
        //getting user data from citizen uuid
        userresponse = await Promise.all(userresponse);
        let foundMobileNo = [];
        let found =false;
        userresponse && userresponse?.length>0 && userresponse.map((ob) => {
          found = ob?.user?.[0]?.roles?.filter(el => el.code === "BPA_ARCHITECT" || el.code === "BPA_SUPERVISOR")?.[0];
            if(fields.find((fi) => !(fi?.uuid && !(found)) && ((fi?.name === ob?.user?.[0]?.name && fi?.mobileNumber === ob?.user?.[0]?.mobileNumber) || (fi?.mobileNumber === ob?.user?.[0]?.mobileNumber && found))))
            {
                //flag = true;
                foundMobileNo.push(ob?.user?.[0]?.mobileNumber);
            }
        })

        // if(foundMobileNo?.length > 0)
        // setShowToast({ key: "true", error: true, message: `${t("BPA_OWNER_VALIDATION_1")} ${foundMobileNo?.join(", ")} ${t("BPA_OWNER_VALIDATION_2")}` });
        if(flag == true)
        return false;
        else 
        return true;
    }

    const goNext = async () => {
    if(!error){
        const moveforward = await getUserData();
       if(moveforward){
        if (ismultiple == true && fields.length == 1) {
            window.scrollTo(0,0);
            setError("BPA_ERROR_MULTIPLE_OWNER");
        }
        else {      
            for (const field of fields){
              const userPresent = await Digit.UserService.userSearch(Digit.ULBService.getStateId(), { userName: field?.mobileNumber }, {});
              if (userPresent?.user?.length==0){
              await Digit.UserService.userCreate(Digit.ULBService.getStateId(), { userName: field?.mobileNumber,mobileNumber: field?.mobileNumber, name: field?.name, gender:field?.gender?.code,emailId:field?.emailId, active: true, type:"citizen", roles: [             {
                     "name": "Citizen",
                     "code": "CITIZEN",
                     "tenantId": "pg"
                 }
             ], }, {})
            }
            }  
            let userData=[];
            for (const field of fields){
            const usersResponse = await Digit.UserService.userSearch(Digit.ULBService.getStateId(), { userName: field?.mobileNumber }, {});
            if(usersResponse?.user?.[0]?.dob){ 
                usersResponse.user[0].dob = convertDateToEpoch(usersResponse?.user?.[0]?.dob);}
            if(usersResponse?.user?.[0]?.gender===null ||usersResponse?.user?.[0]?.gender===undefined){
                usersResponse.user[0].gender=gender;
            }
            if (usersResponse?.user?.[0]?.createdDate) {
                    usersResponse.user[0].createdDate = convertDateTimeToEpoch(usersResponse?.user?.[0]?.createdDate);
                    usersResponse.user[0].lastModifiedDate = convertDateTimeToEpoch(usersResponse?.user?.[0]?.lastModifiedDate);
                    usersResponse.user[0].pwdExpiryDate = convertDateTimeToEpoch(usersResponse?.user?.[0]?.pwdExpiryDate);
            }
            userData.push(usersResponse?.user?.[0]);             
            }
            let owner = formData.owners;
            let ownerStep;
            
            ownerStep = { ...owner, owners: userData, ownershipCategory: ownershipCategory };
            
            if (!formData?.id) {
                setIsDisable(true);
                //for owners conversion
                let conversionOwners = [];
                ownerStep?.owners?.map(owner => {
                    conversionOwners.push({
                        ...owner,
                        active:true,
                        name: owner.name,
                        mobileNumber: owner.mobileNumber,
                        isPrimaryOwner: ownerStep?.owners.length>1 ?owner.isPrimaryOwner:true,
                        gender: owner.gender?.code || owner.gender,
                        emailId:owner.emailId!==null?owner.emailId:emailId,
                        fatherOrHusbandName: "NAME"
                    })
                });
                let Property= {}
                let createdProp={}
                if(!formData?.cptId){
                
                    Property.tenantId= formData?.address?.city?.code,
                    Property.landInfo = {};
                    //For Address
                    Property.address = {};
                    if (formData?.address?.city?.code) Property.address.city = formData?.address?.city?.code;
                    if (formData?.address?.locality?.code) Property.address.locality = { code: formData?.address?.locality?.code };
                    if (formData?.address?.pincode) Property.address.pincode = formData?.address?.pincode;
                    if (formData?.address?.landmark) Property.address.landmark = formData?.address?.landmark;
                    if (formData?.address?.street) Property.address.street = formData?.address?.street;
                    if (formData?.address?.geoLocation) Property.address.geoLocation = formData?.address?.geoLocation;
                    Property.propertyType= "VACANT",
                   // ...data.propertyDetails,
                   Property.ownershipCategory= ownershipCategory.code,
                   Property.usageCategory= formData?.data?.occupancyType.toUpperCase();
                   Property.owners= conversionOwners?.map((owner, index)=>({
                        name:owner.name,
                        mobileNumber:owner.mobileNumber,
                        correspondenceAddress:owner.correspondenceAddress,
                        relationship:owner.relationship,
                        fatherOrHusbandName:owner.fatherOrHusbandName,
                        gender: owner.gender,
                        emailId:owner.emailId,
                        documents:owner.documents,                        
                        ownerType:"NONE",
                        permanentaddress:"",
                        additionalDetails:{
                        ownerSequence: index,
                        ownerName: owner.name
                      }
                    })) || [],
                    //Property.additionalDetails.owners=Property.owners;
                    Property.landArea=formData?.data?.edcrDetails?.planDetail?.blocks?.[0]?.building?.totalBuitUpArea.toFixed(2)||formData?.data?.edcrDetails?.drawingDetail?.totalBuitUpArea;
                    Property.noOfFloors=formData?.data?.edcrDetails?.planDetail?.blocks?.[0]?.building?.totalFloors||formData?.data?.edcrDetails?.drawingDetail?.blocks?.[0]?.building?.totalFloors;
                    Property.additionalDetails= {
                      isRainwaterHarvesting:false,
                      owners:conversionOwners?.map((owner, index)=>({
                        ...owner,
                     ownerType:"NONE",
                      permanentaddress:"",
                      additionalDetails:{
                        ownerSequence: index,
                        ownerName: owner.name
                      }
                    })) || [],
                    },
                    Property.creationReason= "CREATE";
                    Property.source= "MUNICIPAL_RECORDS";
                    Property.channel= "SYSTEM";
                 
                     createdProp = await PTService.create({Property, tenantId})
              }
                let payload = {};
                payload.edcrNumber = formData?.edcrNumber?.edcrNumber ? formData?.edcrNumber?.edcrNumber :formData?.data?.scrutinyNumber?.edcrNumber ||formData?.data?.scrutinyNumber;
                payload.riskType = formData?.data?.riskType;
                payload.applicationType = formData?.data?.applicationType;
                payload.serviceType = formData?.data?.serviceType;

                const userInfo = Digit.UserService.getUser();
                const accountId = userInfo?.info?.uuid;
                payload.tenantId = formData?.address?.city?.code;
                payload.workflow = { action: "INITIATE", assignes : [userInfo?.info?.uuid] };
                payload.accountId = accountId;
                payload.documents = null;

                // Additonal details
                payload.additionalDetails = {GISPlaceName:formData?.address?.placeName};
                if (formData?.data?.holdingNumber||formData?.holdingNumber) payload.additionalDetails.holdingNo = formData?.holdingNumber||formData?.data?.holdingNumber;
                if (formData?.data?.registrationDetails||formData?.registrationDetails) payload.additionalDetails.registrationDetails = formData?.registrationDetails||formData?.data?.registrationDetails;
                if (formData?.data?.applicationType) payload.additionalDetails.applicationType = formData?.data?.applicationType;
                if (formData?.data?.serviceType) payload.additionalDetails.serviceType = formData?.data?.serviceType;
                payload.additionalDetails.isPreApproved = formData?.selectedPlot||formData?.businessService==="BPA-PAP" ? true : false;
                //For LandInfo
                payload.landInfo = {};
                //For Address
                payload.landInfo.address = {};
                if (formData?.address?.city?.code) payload.landInfo.address.city = formData?.address?.city?.code;
                if (formData?.address?.locality?.code) payload.landInfo.address.locality = { code: formData?.address?.locality?.code };
                if (formData?.address?.pincode) payload.landInfo.address.pincode = formData?.address?.pincode;
                if (formData?.address?.landmark) payload.landInfo.address.landmark = formData?.address?.landmark;
                if (formData?.address?.street) payload.landInfo.address.street = formData?.address?.street;
                if (formData?.address?.geoLocation) payload.landInfo.address.geoLocation = formData?.address?.geoLocation;

                payload.landInfo.owners = conversionOwners;
                payload.landInfo.ownershipCategory = ownershipCategory.code;
                payload.landInfo.tenantId = formData?.address?.city?.code;
                formData?.estimate ? payload.businessService = "BPA-PAP":"";
                //for units
                const blockOccupancyDetails = formData;
                payload.landInfo.unit = getUnitsForAPI(blockOccupancyDetails);

                let nameOfAchitect = sessionStorage.getItem("BPA_ARCHITECT_NAME");
                let parsedArchitectName = nameOfAchitect ? JSON.parse(nameOfAchitect) : "ARCHITECT";
                payload.additionalDetails.typeOfArchitect = parsedArchitectName;
                payload.additionalDetails.plotNo = formData?.data?.edcrDetails?.planDetail?.planInformation.plotNo||formData?.plotNo;
                payload.additionalDetails.khataNo = formData?.data?.edcrDetails?.planDetail?.planInformation?.khataNo||formData?.khataNo;
                payload.additionalDetails.applicantName = formData?.data?.applicantName
                Digit.OBPSService.create({ BPA: payload }, tenantId)
                    .then((result, err) => {
                        if (result?.BPA?.length > 0) {
                            result?.BPA?.[0]?.landInfo?.owners?.forEach(owner => {
                                owner.gender = { code: owner.gender, active: true, i18nKey: `COMMON_GENDER_${owner.gender}` }
                            });
                            result.BPA[0].owners = { ...owner, owners: result?.BPA?.[0]?.landInfo?.owners, ownershipCategory: ownershipCategory };
                            result.BPA[0].address = result?.BPA?.[0]?.landInfo?.address;
                            result.BPA[0].address.city = formData.address.city;
                            result.BPA[0].address.locality = formData.address.locality;
                            result.BPA[0].placeName = formData?.address?.placeName;
                            result.BPA[0].data = formData.data;
                            result.BPA[0].additionalDetails.propertyID=formData?.cptId ?formData?.cptId?.id: createdProp?.Properties[0]?.propertyId ;
                            if(createdProp?.Properties){
                                result.BPA[0].additionalDetails.propertyAcknowldgementNumber=createdProp?.Properties[0]?.acknowldgementNumber;
                            }
                            result.BPA[0].BlockIds = getBlockIds(result.BPA[0].landInfo.unit);
                            result.BPA[0].subOccupancy= formData?.subOccupancy;
                            result.BPA[0].uiFlow = formData?.uiFlow;
                            setIsDisable(false);
                            onSelect("", result.BPA[0], "", true);
                        }
                    })
                    .catch((e) => {
                        setIsDisable(false);
                        setShowToast({ key: "true", error: true, message: e?.response?.data?.Errors[0]?.message });
                    });
            } else {
                onSelect(config.key, ownerStep);
            }
        }
    }
    };
}

    const onSkip = () => onSelect();

    // if (isLoading) {
    //     return <Loader />
    // }

    function getCanMoveNextMultiple()
    {
        let flag = 0;
        fields && fields?.map((ob) => {
            if(flag !== 1 && (!ob?.name || !ob?.mobileNumber || !ob?.gender?.code) )
            flag = 1;
        })
        
        if(flag == 0)
        return false;
        else
        return true;
    }
let propertyData =JSON.parse(sessionStorage.getItem("Digit_OBPS_PT"))
if(propertyData?.owners)
{
    console.log("propertyData",propertyData)
fields =propertyData?.owners.map((owner) =>{
    let gender
    if (owner.gender =="FEMALE")
    {
        gender={
            "code": "FEMALE",
            "active": true,
            "i18nKey": "COMMON_GENDER_FEMALE"
        }
        return {"name":owner.name, "mobileNumber":owner.mobileNumber, gender:gender,isPrimaryOwner, "emailId":owner.emailId}
    }
    else if (owner.gender =="MALE")
    {
        gender={
            "code": "MALE",
            "active": true,
            "i18nKey": "COMMON_GENDER_MALE"
        }
        return {"name":owner.name, "mobileNumber":owner.mobileNumber, gender:gender,isPrimaryOwner, "emailId":owner.emailId}
    }

})
}

useEffect(()=>{
    let propertyData =JSON.parse(sessionStorage.getItem("Digit_OBPS_PT"))
    if(propertyData?.owners?.length == 1)
    {let value ={
        "code": "INDIVIDUAL.SINGLEOWNER",
        "active": true,
        "i18nKey": "COMMON_MASTERS_OWNERSHIPCATEGORY_INDIVIDUAL_SINGLEOWNER"
    }
    selectedValue(value);
    }
    else if(propertyData?.owners?.length > 1)
    {
        let value={
            "code": "INDIVIDUAL.MULTIPLEOWNERS",
            "active": true,
            "i18nKey": "COMMON_MASTERS_OWNERSHIPCATEGORY_INDIVIDUAL_MULTIPLEOWNERS"
        }
        selectedValue(value);
    }
},[])


    return (
        <div>
        <Timeline currentStep={checkingFlow === "OCBPA"  ? 2 : checkingFlow==="PRE_APPROVE"? 6 : 1 } flow={checkingFlow}/>
        <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={canmovenext || getCanMoveNextMultiple() || !ownershipCategory || isDisable || showToast} forcedError={t(error)}>   
            {!isLoading ?
                <div style={{marginBottom: "10px"}}>
                    <div>
                        <CardLabel>{`${t("BPA_TYPE_OF_OWNER_LABEL")} *`}</CardLabel>
                        <RadioButtons
                            isMandatory={config.isMandatory}
                            options={ownershipCategoryList}
                            selectedOption={ownershipCategory}
                            optionsKey="i18nKey"
                            onSelect={selectedValue}
                            value={ownershipCategory}
                            labelKey="PT_OWNERSHIP"
                            isDependent={true}
                           disabled = {propertyData?.owners ?true:false}
                        />
                    </div>
                    {fields?.map((field, index) => {
                        return (
                            <div key={`${field}-${index}`}>
                                <div style={{ border: "solid", borderRadius: "5px", padding: "10px", paddingTop: "20px", marginTop: "10px", borderColor: "#f3f3f3", background: "#FAFAFA" }}>
                                    <CardLabel style={{ marginBottom: "-15px" }}>{`${t("CORE_COMMON_MOBILE_NUMBER")} *`}</CardLabel>
                                    {ismultiple && <LinkButton
                                        label={ <DeleteIcon style={{ float: "right", position: "relative", bottom: "5px" }} fill={!(fields.length == 1) ? "#494848" : "#FAFAFA"}/>}
                                        style={{ width: "100px", display: "inline", background: "black" }}
                                        onClick={(e) => handleRemove(index)}
                                    />}
                                    <div style={{ marginTop: "30px" }}>
                                        <div className="field-container">
                                            <div style={{ position: "relative", zIndex: "100", left: "35px", marginTop: "-24.5px",marginLeft:Webview?"-25px":"-25px" }}>+91</div>
                                            <TextInput
                                                style={{ background: "#FAFAFA", padding: "0px 35px" }}
                                                type={"text"}
                                                t={t}
                                                isMandatory={false}
                                                optionKey="i18nKey"
                                                name="mobileNumber"
                                                value={field?.mobileNumber}
                                                onChange={(e) => setMobileNo(index, e)}
                                                {...(validation = {
                                                    isRequired: true,
                                                    pattern: "[6-9]{1}[0-9]{9}",
                                                    type: "tel",
                                                    title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
                                                })}
                                                disabled={propertyData?.owners ?true:false}
                                            />
                                            <div style={{ position: "relative", zIndex: "100", right: "35px", marginTop: "-24px", marginRight:Webview?"-20px":"-20px" }} onClick={(e) => getOwnerDetails(index, e)}> <SearchIcon /> </div>
                                        </div>
                                    </div>
                                    <CardLabel>{`${t("CORE_COMMON_NAME")} *`}</CardLabel>
                                    <TextInput
                                        style={{ background: "#FAFAFA" }}
                                        t={t}
                                        type={"text"}
                                        isMandatory={false}
                                        optionKey="i18nKey"
                                        name="name"
                                        value={field?.name}
                                        onChange={(e) => setOwnerName(index, e)}
                                        {...(validation = {
                                            isRequired: true,
                                            pattern: "^[a-zA-Z ]*$",
                                            type: "text",
                                            title: t("TL_NAME_ERROR_MESSAGE"),
                                        })}
                                        disabled={propertyData?.owners ?true:false}
                                    />
                                    <CardLabel>{`${t("BPA_APPLICANT_GENDER_LABEL")} *`}</CardLabel>
                                    <RadioOrSelect
                                    name="gender"
                                    options={genderList}
                                    selectedOption={field?.gender}
                                    optionKey="i18nKey"
                                    onSelect={(e) => setGenderName(index, e)}
                                    t={t}
                                    disabled={propertyData?.owners ? true:false}
                                    />
                                    <div>
                                     <CardLabel>{`${t("CORE_EMAIL_ID")}`}</CardLabel>
                                    <TextInput
                                        style={{ background: "#FAFAFA" }}
                                        t={t}
                                        type={"emailId"}
                                        isMandatory={false}
                                        optionKey="i18nKey"
                                        name="emailId"
                                        value={field?.emailId}
                                        onChange={(e)=>handleEmailChange(index,e)}
                                        {...(validation = {
                                            //isRequired: true,
                                            pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
                                            type: "emailId",
                                            title: t("TL_EMAIL_ID_ERROR_MESSAGE"),
                                        })}
                                        //disabled={propertyData?.address ?true:false}
                                    />
                                    {error && <span style={{color:"red"}}>{error}</span>}
                                    </div>
                                    {ismultiple && (
                                        <CheckBox
                                            label={t("BPA_IS_PRIMARY_OWNER_LABEL")}
                                            onChange={(e) => setPrimaryOwner(index, e)}
                                            value={field?.isPrimaryOwner}
                                            checked={field?.isPrimaryOwner}
                                            style={{ paddingTop: "10px" }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {ismultiple ? (
                        <div>
                            <div style={{ display: "flex", paddingBottom: "15px", color: "#FF8C00" }}>
                                <button type="button" style={{ paddingTop: "10px" }} onClick={() => handleAdd()}>
                                    {t("BPA_ADD_OWNER")}
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div> : <Loader />
            }
        </FormStep>
            {showToast && <Toast
                error={showToast?.error}
                warning={showToast?.warning}
                label={t(showToast?.message)}
                isDleteBtn={true}
                onClose={closeToast}
            />
            }
        </div>
    );
};

export default OwnerDetails;