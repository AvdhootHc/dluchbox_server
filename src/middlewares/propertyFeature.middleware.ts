import { NextFunction, Request, Response } from 'express';
import { TPropertyRequest, TPropertyResponse } from '../interfaces/property';

export const propertyFeature = () => {
  return async (req: TPropertyRequest, res: TPropertyResponse, next: NextFunction) => {
    try {
      let {
        $top,
        $skip,
        $filter,
        $orderby,
        $page,
        Bet,
        $city,
        $address,
        $home_type,
        $minSqFeet,
        $maxSqFeet,
        $days_on_propertybulls,
        $is_parking_slot,
        $year_built_between,
      } = req.query;

      const top = $top ? parseInt($top as string, 10) : undefined;
      const page = $page ? parseInt($page as string, 10) : undefined;

      const skip = $skip ? parseInt($skip as string, 10) : undefined;
      const filter = $filter ? ($filter as string) : undefined;
      const orderby = $orderby ? ($orderby as string) : undefined;
      const city = $city ? ($city as string) : undefined;
      const address = $address ? ($address as string) : undefined;
      const days_on_propertybulls = $days_on_propertybulls ? ($days_on_propertybulls as string) : undefined;
      const parkingSlot = $is_parking_slot ? true : false;

      if ($home_type) {
        const homeTypeArray = $home_type ? ($home_type as string) : undefined;
        var homeType = homeTypeArray.split(',');
      }
      if ($minSqFeet && $maxSqFeet) {
        var minSqFeet = parseInt($minSqFeet as string);
        var maxSqFeet = parseInt($maxSqFeet as string);
      }
      if ($year_built_between) {
        if (typeof $year_built_between === 'string') {
          var [minYear, maxYear] = $year_built_between.split(',').map(Number);
        }
      }

      let between = null;
      if (Bet && typeof Bet === 'string') {
        // Check if Bet is a string
        const betweenMatches = Bet.match(/(\w+) between (\d+) and (\d+)/);
        if (betweenMatches) {
          between = {
            field: betweenMatches[1],
            start: parseInt(betweenMatches[2], 10),
            end: parseInt(betweenMatches[3], 10),
          };
        }
      }

      req.queryParams = {
        top,
        skip,
        filter,
        orderby,
        page,
        between,
        city,
        address,
        homeType,
        minSqFeet,
        maxSqFeet,
        days_on_propertybulls,
        parkingSlot,
        minYear,
        maxYear,
      };

      next();
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: 'Invalid query parameters' });
    }
  };
};
