import regionsData from '@/data/regions.json';
import citiesData from '@/data/cities.json';
import sitesData from '@/data/tourist_sites.json';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type Region = typeof regionsData[0];
export type City = typeof citiesData[0];
export type TouristSite = typeof sitesData[0];

export const getRegions = async (): Promise<Region[]> => {
  await delay(800);
  return regionsData;
};

export const getRegionById = async (id: string): Promise<Region | undefined> => {
  await delay(500);
  return regionsData.find(r => r.id === id);
};

export const getCitiesByRegion = async (regionId: string): Promise<City[]> => {
  await delay(500);
  return citiesData.filter(c => c.region_id === regionId);
};

export const getCityById = async (id: string): Promise<City | undefined> => {
  await delay(500);
  return citiesData.find(c => c.id === id);
};

export const getSitesByCity = async (cityId: string): Promise<TouristSite[]> => {
  await delay(500);
  return sitesData.filter(s => s.city_id === cityId);
};

export const getSiteById = async (id: string): Promise<TouristSite | undefined> => {
  await delay(500);
  return sitesData.find(s => s.id === id);
};

export const getFeaturedSites = async (): Promise<TouristSite[]> => {
  await delay(1000);
  return sitesData.filter(s => s.is_featured);
};
