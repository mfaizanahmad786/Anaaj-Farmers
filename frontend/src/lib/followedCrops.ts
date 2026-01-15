// Utility functions for managing followed crops in localStorage

export interface FollowedCrop {
  id: number;
  name: string;
  category: string;
  currentPrice: number;
}

const STORAGE_KEY = 'followedCrops';

export const getFollowedCrops = (): FollowedCrop[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading followed crops:', error);
    return [];
  }
};

export const addFollowedCrop = (crop: FollowedCrop): void => {
  try {
    const followed = getFollowedCrops();
    // Check if already following
    if (!followed.find(c => c.id === crop.id)) {
      followed.push(crop);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(followed));
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('followedCropsChanged'));
    }
  } catch (error) {
    console.error('Error adding followed crop:', error);
  }
};

export const removeFollowedCrop = (cropId: number): void => {
  try {
    const followed = getFollowedCrops();
    const filtered = followed.filter(c => c.id !== cropId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('followedCropsChanged'));
  } catch (error) {
    console.error('Error removing followed crop:', error);
  }
};

export const isFollowing = (cropId: number): boolean => {
  const followed = getFollowedCrops();
  return followed.some(c => c.id === cropId);
};

export const toggleFollowCrop = (crop: FollowedCrop): boolean => {
  if (isFollowing(crop.id)) {
    removeFollowedCrop(crop.id);
    return false;
  } else {
    addFollowedCrop(crop);
    return true;
  }
};
