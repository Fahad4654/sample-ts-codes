import { satisfies } from 'semver';

interface PackageInfo {
  name: string;
  currentVersion: string;
  requiredVersion: string;
}

async function checkPackageVersion(packageInfo: PackageInfo): Promise<boolean> {
  try {
    if (!satisfies(packageInfo.currentVersion, packageInfo.requiredVersion)) {
      console.warn(`Package ${packageInfo.name}: Required version ${packageInfo.requiredVersion}, current version ${packageInfo.currentVersion}.`);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Error checking package ${packageInfo.name} version:`, error);
    return false;
  }
}

async function checkPackages(packages: PackageInfo[]): Promise<boolean> {
  let allGood = true;
  for (const pkg of packages) {
    const result = await checkPackageVersion(pkg);
    if (!result) {
      allGood = false;
    }
  }
  return allGood;
}

export { checkPackageVersion, checkPackages, PackageInfo };

// Example usage (in a separate file):
// import { checkPackages, PackageInfo } from './version-checker';

// const packagesToCheck: PackageInfo[] = [
//   { name: 'react', currentVersion: '17.0.0', requiredVersion: '^16.8.0' },
//   { name: 'lodash', currentVersion: '4.17.21', requiredVersion: '4.x' },
// ];

// checkPackages(packagesToCheck).then(allGood => {
//   if (allGood) {
//     console.log('All package versions are compatible.');
//   } else {
//     console.warn('Some package versions are incompatible.');
//   }
// });