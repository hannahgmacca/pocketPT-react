// import { useReducer, useEffect, useState, useContext, useCallback, Dispatch, SetStateAction } from 'react';
// import BondCalculatorReducer, { initialBondCalcState } from './bondCalculatorReducer';
// import { BondCalcActions } from './bondCalculatorActions';
// import UiBoolean from 'src/scripts/common/UiBoolean';
// import { DataDisplayConstants } from 'src/constants';
// import { FiigContext } from 'src/context/FiigContext';

// import {
//     ApiError,
//     BondAttributesCalculateRequest,
//     BondCalcInstrumentResponse,
//     CalcServiceBondAttribute,
//     InstrumentRevaluationRequest,
//     InstrumentRevaluationResponse,
//     RedemptionResponse,
//     RedemptionViewModel,
//     RedemptionStatus,
// } from 'src/domain';

// import {
//     ErrorDialog,
//     initialErrorDialogState,
//     instrumentLoadingError,
//     instrumentAttributesLoadingError,
//     projectedCashflowLoadingError,
//     calcSettingsLoadingError,
//     noPriceLoadingError
// } from './errorDialogs';

// const uiBooleanInit: UiBoolean = {
//     loading: false,
//     error: false,
//     errorDialog: false,
// };

// const maximumRedemptionRevaluations = 1;

// type BondCalculationType = Partial<{ [key in 'CleanPrice' | 'TotalPrice' | 'YieldValue' | 'MarginValue']: number }>

// interface HasChangedField {
//     hasChanged: boolean;
//     field: string;
// }

// export default function useBondCalculator() {
//     const defaultRedemptionRequestId = 'baseRequest';

//     const { BondCalcClient } = useContext(FiigContext).gatewayClient;
//     const [state, dispatch] = useReducer(BondCalculatorReducer, initialBondCalcState);
//     const {
//         instrument,
//         redemptions,
//         tradeDate,
//         settlementDate,
//         cpi,
//         faceValue,
//         cleanPrice,
//         totalPrice,
//         marginValue,
//         yieldValue,
//         priceToRedemptionDate,
//         priceToRedemptionValue
//     } = state;

//     const [calculationType, setCalculationType] = useState<BondCalculationType>();
//     const [isLoadingCalcSettings, setIsLoadingCalcSettings] = useState(uiBooleanInit);
//     const [isLoadingInstrumentAttributes, setIsLoadingInstrumentAttributes] = useState(uiBooleanInit);
//     const [isLoadingNextSettlementDate, setIsLoadingNextSettlementDate] = useState(uiBooleanInit);
//     const [isLoadingInstrument, setIsLoadingInstrument] = useState(uiBooleanInit);
//     const [isLoadingProjectedCashflows, setIsLoadingProjectedCashflows] = useState(uiBooleanInit);
//     const [hasCalcDataChanged, setHasCalcDataChanged] = useState<HasChangedField>({hasChanged: false, field: ''});
//     const [error, setError] = useState(initialErrorDialogState);

//     const onFirstLoad = useCallback(async () => {
//         const fetchCalculationSettings = async () => {
//             try {
//                 setIsLoadingCalcSettings({loading: true, error: false});
//                 const result = await BondCalcClient.GetInstrumentCalcSettings();
//                 dispatch(BondCalcActions.setCalcSettings(result));
//                 setIsLoadingCalcSettings({loading: false, error: false});
//             } catch (err) {
//                 handleError(calcSettingsLoadingError, setIsLoadingCalcSettings, err);
//             }
//         };
//         fetchCalculationSettings();
//     }, [BondCalcClient]);

//     const createStandardInstrumentRevaluationRequest = (): InstrumentRevaluationRequest => {
//         return {
//             settlementDate: settlementDate || instrument.initialSettlementDate,

//             // The clean price can be left as undefined. That way it will be set as the result
//             // of the api calcuation on certain input price types.
//             cleanPrice: undefined,

//             faceValue: faceValue,
//             currentBondAttributesCalculateRequest: {
//                 instrumentId: instrument.instrumentId,
//                 requestId: defaultRedemptionRequestId,
//                 curveDate: tradeDate,
//                 settlementDate: settlementDate || instrument.initialSettlementDate,
//                 inputPriceType: CalcServiceBondAttribute.CleanPrice,
//                 inputPrice: cleanPrice,
//                 redemptionDate: priceToRedemptionDate,
//                 redemptionValue: priceToRedemptionValue,
//                 inflationAssumption: cpi
//             },
//         };
//     };

//     const createStandardBondAttributesCalculateRequest = useCallback((
//         redemption: RedemptionViewModel,
//         instrumentDetails: BondCalcInstrumentResponse,
//         instrumentRevalRequest: InstrumentRevaluationRequest | null = null
//     ): BondAttributesCalculateRequest => {
//         return {
//             instrumentId: instrumentDetails.instrumentId,
//             settlementDate: instrumentRevalRequest?.currentBondAttributesCalculateRequest.settlementDate
//                 ?? instrumentDetails.initialSettlementDate,
//             curveDate: instrumentRevalRequest?.currentBondAttributesCalculateRequest.curveDate
//                 ?? instrumentDetails.initialTradeDate,
//             inputPriceType: CalcServiceBondAttribute.CleanPrice,
//             inputPrice: instrumentRevalRequest?.currentBondAttributesCalculateRequest.inputPrice
//                 ?? instrumentDetails.markCleanPrice ?? 0,
//             redemptionDate: redemption.redemptionDate,
//             redemptionValue: redemption.redemptionValue,
//             inflationAssumption: cpi,
//             requestId: redemption.uniqueIdentifier
//         };
//     }, [cpi]);

//     const cancelPreviousRedemptionCalculationCalls = () => {
//         // Cancel any previous redemption calculations that may still be happening
//         for(const redemption of redemptions) {
//             BondCalcClient.CancelRevaluateRedemptionRequest(redemption.uniqueIdentifier);
//         }
//     };

//     const revaluateRedemptions = useCallback((
//         redemptions: RedemptionViewModel[],
//         instrumentDetails: BondCalcInstrumentResponse,
//         instrumentRevalRequest: InstrumentRevaluationRequest | null = null,
//         yieldToWorstRedemptionDate: Date | null = null
//     ) => {

//         const redemptionsClone = [...redemptions];

//         for (let i = 0; i < redemptionsClone.length; i++) {
//             const redemption = redemptionsClone[i];
//             const redemptionDateStr = redemption.redemptionDate.toISOString();
//             const yieldToWorstRedemptionDateStr = yieldToWorstRedemptionDate?.toISOString();
//             const willCalculate = i < maximumRedemptionRevaluations
//                                 || redemption.isAssumedMaturityDate
//                                 || redemption.isYieldToWorstRedemptionDate
//                                 || (i > maximumRedemptionRevaluations
//                                     &&  redemptionDateStr === yieldToWorstRedemptionDateStr);

//             if (willCalculate) {
//                 const request: BondAttributesCalculateRequest = createStandardBondAttributesCalculateRequest(
//                     redemption,
//                     instrumentDetails,
//                     instrumentRevalRequest);

//                 BondCalcClient.RevaluateRedemption(request).then(result => {
//                     dispatch(BondCalcActions.setRedemptionRevaluation(result));
//                 });

//                 redemption.redemptionStatus = RedemptionStatus.Loading;
//             } else {
//                 redemption.redemptionStatus = RedemptionStatus.ManualLoad;
//             }
//         }

//         dispatch(BondCalcActions.setRedemptions(redemptionsClone));

//     }, [BondCalcClient, createStandardBondAttributesCalculateRequest]);

//     const revaluateInstrument = useCallback(async (
//         instrumentId: number,
//         request: InstrumentRevaluationRequest
//     ): Promise<InstrumentRevaluationResponse> => {
//         const result = await BondCalcClient.RevaluateInstrument(instrumentId, request);
//         return result;
//     }, [BondCalcClient]);

//     const fetchInstrument = async (id: number) => {
//         if (isLoadingInstrument.loading) {
//             return;
//         }

//         try {
//             setIsLoadingInstrument({loading: true, error: false});
//             setIsLoadingInstrumentAttributes({loading: true, error: false});

//             const instrumentResponse: BondCalcInstrumentResponse = id
//                 ? await BondCalcClient.GetBondCalcInstrument(id, { inflationAssumption: cpi })
//                 : initialBondCalcState.instrument;

//             if (!instrumentResponse.isPriced) {
//                 handleError(noPriceLoadingError, setIsLoadingInstrument, undefined, true);
//                 setIsLoadingInstrumentAttributes({loading: false, error: false});
//             }

//             dispatch(BondCalcActions.setInstrument(instrumentResponse));
//             setIsLoadingInstrument({loading: false, error: false});
//             setIsLoadingInstrumentAttributes({loading: false, error: false});

//             const redemptionViewModels: RedemptionViewModel[] = instrumentResponse.redemptions.map(r => {
//                 return {
//                     ...r,
//                     redemptionStatus: RedemptionStatus.Hide
//                 } as RedemptionViewModel;
//             });

//             revaluateRedemptions(redemptionViewModels, instrumentResponse);
//         } catch (error) {
//             handleError(instrumentLoadingError, setIsLoadingInstrument, error);
//             setIsLoadingInstrumentAttributes({loading: false, error: false});
//         }
//     };

//     const handleSettlementDate = async (newDate: Date) => {
//         const newTradeDate = (tradeDate && new Date(newDate).getTime() < new Date(tradeDate).getTime()) ? newDate : tradeDate;
//         dispatch(BondCalcActions.setTradeDate({ tradeDate: newTradeDate, settlementDate: newDate }));

//         const request: InstrumentRevaluationRequest = {
//             ...createStandardInstrumentRevaluationRequest(),
//         };

//         request.currentBondAttributesCalculateRequest.settlementDate = newDate;
//         request.currentBondAttributesCalculateRequest.curveDate = newTradeDate;
//         setHasCalcDataChanged({hasChanged: true, field: ''});
//     };

//     const handleTradeDate = async (newDate: Date) => {
//         if (!newDate) return;

//         try {
//             setIsLoadingNextSettlementDate({loading: true, error: false});

//             const nextValidSettlementDate = await BondCalcClient.GetNextValidSettlementDate(newDate, instrument.calendarId);
//             dispatch(BondCalcActions.setTradeDate({ tradeDate: newDate, settlementDate: nextValidSettlementDate.date }));
//             setIsLoadingNextSettlementDate({loading: false, error: false});
//             setHasCalcDataChanged({hasChanged: true, field: ''});

//         } catch (error) {
//             handleError(instrumentAttributesLoadingError, setIsLoadingInstrumentAttributes, error);
//         }
//     };

//     const handleFaceValue = async (value?: number) => {
//         if (!value) return;
//         dispatch(BondCalcActions.setFaceValue(value));

//         const request: InstrumentRevaluationRequest = {
//             ...createStandardInstrumentRevaluationRequest(),
//             faceValue: value
//         };
//         setHasCalcDataChanged({hasChanged: true, field: ''});
//     };

//     const handleCpi = async (value = 0) => {
//         if (!value) return;
//         dispatch(BondCalcActions.setCpi(value));

//         const request: InstrumentRevaluationRequest = {
//             ...createStandardInstrumentRevaluationRequest(),
//         };

//         request.currentBondAttributesCalculateRequest.inflationAssumption = value;

//         try {
//             cancelPreviousRedemptionCalculationCalls();

//             if (!settlementDate || !tradeDate || !redemptions?.length || !redemptions.every(x => x.yieldToCustom)) {
//                 const revaluation = await revaluateInstrument(instrument.instrumentId, request);
//                 dispatch(BondCalcActions.setInstrumentRevaluation(revaluation));
//                 revaluateRedemptions(redemptions, instrument, request, revaluation?.currentAttributes?.yieldToWorstRedemptionDate);
//                 return;
//             }

//             setIsLoadingInstrumentAttributes({loading: true, error: false});
//             const revaluation = await revaluateInstrument(instrument.instrumentId, request);
//             dispatch(BondCalcActions.setInstrumentRevaluation(revaluation));
//             revaluateRedemptions(redemptions, instrument, request, revaluation?.currentAttributes?.yieldToWorstRedemptionDate);
//             setIsLoadingInstrumentAttributes({loading: false, error: false});
//         } catch (error) {
//             handleError(instrumentAttributesLoadingError, setIsLoadingInstrumentAttributes, error);
//         }
//     };

//     const handleCalculateYield = async (redemption: RedemptionResponse) => {
//         const redemptionsClone = [...redemptions];
//         const matchingRedemptionIndex = redemptionsClone.findIndex(r => r.uniqueIdentifier === redemption.uniqueIdentifier);

//         if (matchingRedemptionIndex <= 0) return;

//         redemptionsClone[matchingRedemptionIndex].redemptionStatus = RedemptionStatus.Loading;
//         dispatch(BondCalcActions.setRedemptions(redemptionsClone));

//         const request: BondAttributesCalculateRequest = {
//             instrumentId: instrument.instrumentId,
//             settlementDate: settlementDate || instrument.initialSettlementDate,
//             curveDate: tradeDate || instrument.initialTradeDate,
//             inputPriceType: CalcServiceBondAttribute.CleanPrice,
//             inputPrice: cleanPrice || 0,
//             redemptionDate: redemption.redemptionDate,
//             redemptionValue: redemption.redemptionValue,
//             inflationAssumption: cpi,
//             requestId: redemption.uniqueIdentifier
//         };

//         BondCalcClient.RevaluateRedemption(request).then(result => {
//             dispatch(BondCalcActions.setRedemptionRevaluation(result));
//         });
//     };

//     const handlePriceToRedemptionDate = async (redemptionInput?: { date: Date; value: number }) => {
//         if (!redemptionInput?.date || !redemptions.length) {
//             return;
//         }

//         const targetRedemption = redemptions.find(r =>
//             new Date(r.redemptionDate).toISOString().slice(0, 10) === new Date(redemptionInput.date).toISOString().slice(0, 10));

//         if (!targetRedemption) {
//             return;
//         }

//         dispatch(BondCalcActions.setPriceToRedemptionDate(targetRedemption));
//         setIsLoadingInstrumentAttributes({loading: true, error: false});

//         const request: InstrumentRevaluationRequest = {
//             ...createStandardInstrumentRevaluationRequest(),
//         };

//         try {
//             // The redemption may not have yet been loaded. If so, force a calculation and await its result before proceeding.
//             if (targetRedemption.redemptionStatus !== RedemptionStatus.Loaded) {
//                 const redemptionsClone = [...redemptions];

//                 const bondAttributesRequest: BondAttributesCalculateRequest = createStandardBondAttributesCalculateRequest(
//                     targetRedemption,
//                     instrument,
//                     request);

//                 const result = await BondCalcClient.RevaluateRedemption(bondAttributesRequest);

//                 targetRedemption.redemptionStatus = RedemptionStatus.Loaded;
//                 targetRedemption.yieldToCustom = result.yieldToCustom;
//                 targetRedemption.isYieldToWorstRedemptionDate = result.isYieldToWorstRedemptionDate;

//                 const index = redemptionsClone.findIndex(r => r.uniqueIdentifier === targetRedemption.uniqueIdentifier);

//                 if (index >= 0) {
//                     redemptionsClone[index] = targetRedemption;
//                     dispatch(BondCalcActions.setRedemptions(redemptionsClone));
//                 }
//             }
//             setHasCalcDataChanged({hasChanged: true, field: ''});
//             setIsLoadingInstrumentAttributes({loading: false, error: false});
//         } catch (error) {
//             handleError(instrumentAttributesLoadingError, setIsLoadingInstrumentAttributes, error);
//         }
//     };

//     const handleCleanPrice = async (value = 0, autoCalc = false) => {
//         const cleanPriceTolerance = instrument?.priceRoundingDecimalPlaces || DataDisplayConstants.DecimalPlacesPrice;

//         if (!value || value.toFixed(cleanPriceTolerance) === cleanPrice.toFixed(cleanPriceTolerance)) {
//             return;
//         }

//         setCalculationType({ 'CleanPrice': value });
//         setHasCalcDataChanged({ hasChanged: true, field: 'CleanPrice'} );

//         if (autoCalc) {
//             calculatePricing({ 'CleanPrice': value });
//         }
//     };

//     const handleTotalPrice = async (value = 0, autoCalc = false) => {
//         const totalPriceTolerance = instrument?.priceRoundingDecimalPlaces || DataDisplayConstants.DecimalPlacesPrice;

//         if (!value || value.toFixed(totalPriceTolerance) === totalPrice.toFixed(totalPriceTolerance)) {
//             return;
//         }

//         setCalculationType({ 'TotalPrice': value });
//         setHasCalcDataChanged({hasChanged: true, field: 'TotalPrice'});

//         if (autoCalc) {
//             calculatePricing({ 'TotalPrice': value });
//         }
//     };

//     const handleYieldValue = async (value = 0, autoCalc = false) => {
//         const yieldTolerance = DataDisplayConstants.DecimalPlacesNumber12;

//         if (!value || value.toFixed(yieldTolerance) === yieldValue.toFixed(yieldTolerance)) {
//             return;
//         }

//         dispatch(BondCalcActions.setYieldValue(value));
//         setCalculationType({ 'YieldValue': value });
//         setHasCalcDataChanged({hasChanged: true, field: 'YieldValue'});

//         if (autoCalc) {
//             calculatePricing({ 'YieldValue': value });
//         }
//     };

//     const handleMarginValue = async (value = 0, autoCalc = false) => {
//         const marginTolerance = DataDisplayConstants.DecimalPlacesNumber12;

//         if (!value || value.toFixed(marginTolerance) === marginValue.toFixed(marginTolerance)) {
//             return;
//         }

//         setCalculationType({ 'MarginValue': value });

//         setHasCalcDataChanged({hasChanged: true, field: 'MarginValue'});

//         if (autoCalc) {
//             calculatePricing({ 'MarginValue': value });
//         }
//     };

//     const calculatePricing = async (calcType = calculationType) => {

//         const request: InstrumentRevaluationRequest  = { ...createStandardInstrumentRevaluationRequest() };
//         const defaultRedemption: BondAttributesCalculateRequest = request.currentBondAttributesCalculateRequest;
//         let willCalculateRedemptions = false;

//         if(calcType) {
//             switch (Object.keys(calcType).join()) {
//                 case 'CleanPrice':
//                     if (!calcType['CleanPrice']) return;
//                     defaultRedemption.inputPriceType = CalcServiceBondAttribute.CleanPrice;
//                     defaultRedemption.inputPrice = calcType['CleanPrice'];
//                     request.cleanPrice = calcType['CleanPrice'];
//                     willCalculateRedemptions = true;

//                     if (!settlementDate || !tradeDate || !redemptions?.length || !redemptions.every(x => x.yieldToCustom)) {
//                         break;
//                     }

//                     break;

//                 case 'TotalPrice':
//                     if (!calcType['TotalPrice']) return;

//                     defaultRedemption.inputPriceType = CalcServiceBondAttribute.DirtyPrice;
//                     defaultRedemption.inputPrice = calcType['TotalPrice'];

//                     break;

//                 case 'YieldValue':
//                     if (!calcType['YieldValue']) return;

//                     defaultRedemption.inputPriceType = CalcServiceBondAttribute.YieldToCustom;
//                     defaultRedemption.inputPrice = calcType['YieldValue'];

//                     break;

//                 case 'MarginValue':
//                     if (!calcType['MarginValue']) return;

//                     defaultRedemption.inputPriceType = CalcServiceBondAttribute.TradingMarginToCustom;
//                     defaultRedemption.inputPrice = calcType['MarginValue'];

//                     break;

//                 default:
//                     break;
//             }
//         }
//         request.currentBondAttributesCalculateRequest = defaultRedemption;

//         try {
//             setIsLoadingInstrumentAttributes({loading: true, error: false});
//             if (willCalculateRedemptions) {
//                 cancelPreviousRedemptionCalculationCalls();
//             }

//             const revaluation = await revaluateInstrument(instrument.instrumentId, request);

//             dispatch(BondCalcActions.setInstrumentRevaluation(revaluation));
//             setIsLoadingInstrumentAttributes({loading: false, error: false});
//             if (willCalculateRedemptions) {
//                 revaluateRedemptions(redemptions, instrument, request, revaluation?.currentAttributes?.yieldToWorstRedemptionDate);
//             }
//             setHasCalcDataChanged({hasChanged: false, field: ''});
//         } catch (error) {
//             handleError(instrumentAttributesLoadingError, setIsLoadingInstrumentAttributes, error);
//         }
//     };

//     const fetchInstrumentProjectedCashflows = async () => {
//         if (isLoadingProjectedCashflows.loading || !tradeDate || !settlementDate) {
//             return;
//         }

//         try {
//             isLoading(setIsLoadingProjectedCashflows, true);

//             const result = await BondCalcClient.GetInstrumentProjectedCashflows(
//                 instrument.instrumentId,
//                 faceValue,
//                 cleanPrice,
//                 tradeDate,
//                 settlementDate,
//                 cpi,
//                 redemptions.find(x => x.redemptionDate === priceToRedemptionDate));

//             dispatch(BondCalcActions.setCashflows({cashflowSummary: result.summary, cashflows: result.cashflows}));
//             isLoading(setIsLoadingProjectedCashflows, false);
//         } catch (error) {
//             handleError(projectedCashflowLoadingError, setIsLoadingProjectedCashflows, error);
//         }
//     };

//     const isLoading = (uiCallback: (uiBoolean: UiBoolean) => void, isLoading: boolean) => {
//         uiCallback({...uiBooleanInit, loading: isLoading});
//     };

//     const handleError = (
//         dialog: ErrorDialog,
//         uiCallback: Dispatch<SetStateAction<UiBoolean>>,
//         error?: ApiError,
//         isBusinessError?: boolean
//     ) => {

//         if (!error) return;

//         dialog = {
//             ...dialog,
//             isDialogOpen: true,
//             onDialogClose: () => setError(initialErrorDialogState),
//             errorItems: error?.Errors ?? [],
//             isErrorBusinessRuleFailure: isBusinessError
//         };

//         setError(dialog);
//         uiCallback({loading: false, error: false});

//         console.error(error);
//     };

//     useEffect(() => {
//         onFirstLoad();
//     }, [BondCalcClient, onFirstLoad]);

//     const hookValues = {
//         state,
//         handler: {
//             handleSettlementDate,
//             handleTradeDate,
//             handleFaceValue,
//             handleCpi,
//             handleCleanPrice,
//             handleTotalPrice,
//             handleYieldValue,
//             handleMarginValue,
//             handlePriceToRedemptionDate,
//             calculatePricing,
//             handleCalculateYield,
//         },
//         uiBoolean: {
//             isLoadingCalcSettings,
//             isLoadingInstrumentAttributes,
//             isLoadingInstrument,
//             isLoadingProjectedCashflows,
//             isLoadingNextSettlementDate,
//             hasCalcDataChanged
//         },
//         client: {
//             fetchInstrument,
//             fetchInstrumentProjectedCashflows,
//         },
//         error
//     };

//     return { ...hookValues };
// }

// export type BondCalcHookType = ReturnType<typeof useBondCalculator>
