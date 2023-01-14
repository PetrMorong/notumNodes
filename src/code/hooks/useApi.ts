/* eslint-disable */
import { QueryClient, useQuery } from '@tanstack/react-query'
import { AppApi, Configuration, AppControllerLoginRequest, AppControllerSaveNodesRequest } from '../../api'

/**
 * This configuration is used to initialize AppApi instance.
 */
const config = () => {
  return new Configuration({
    basePath: 'http://localhost:3002',
    accessToken: localStorage.getItem("authtoken") || ""
  })
}

const api = new AppApi(config());

/**
 * Try to use https://tanstack.com/query/v4 to fetch data from API.
 * Create your custom hooks here and use them in components.
 * Typescript types and api call are generated in `api/` folder.
 */

export const queryClient = new QueryClient()

export const loginApiCall = (loginRequest: AppControllerLoginRequest) => 
  api.appControllerLogin(loginRequest)

  export const saveNodesApi = (nodes: AppControllerSaveNodesRequest) => 
  api.appControllerSaveNodes(nodes)

  export const getUserInfoApiCall = () => 
  api.appControllerGetMe()

  export const getNodeApi = () => 
  api.appControllerGetNodes()

  export const getUserInfo = () => {
    return useQuery({ queryKey: ['userInfo'], queryFn: getUserInfoApiCall });
  }

  export const getNodes = () => {
    return useQuery({ queryKey: ['nodes'], queryFn: getNodeApi });
  }

  

  

enum Queries {
  // fetch nodes from API (function AppApi.appControllerGetNodes())
  'nodes' = 'nodes',
  // fetch user from API (function AppApi.appControllerGetMe())
  'me' = 'me',
}

enum Mutations {
  // login to API (AppApi.appControllerLogin())
  'login' = 'login',
  // save nodes to API (AppApi.appControllerSaveNodes())
  'saveNodes' = 'saveNodes',
}
