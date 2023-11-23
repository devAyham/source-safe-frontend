import {ServiceType} from "../constants/servicesName";

export const generateEntityQueryKey = ({entityType, entityId}: {
                                           entityType: ServiceType,
                                           entityId: any
                                       }
) => {
    if (entityId) {
        return [entityType, entityId];
    }
    return [entityType];
};

export const generateEntityCollectionQueryKey = ({
                                                     entityType,
                                                     params
                                                 }: {
    entityType: ServiceType,
    params: any
}) => {
    const paramKeys = Object.keys(params??[]).sort();
    const paramValues = paramKeys.map((key) => params[key]);
    return [entityType, ...paramValues, ...paramKeys];
};