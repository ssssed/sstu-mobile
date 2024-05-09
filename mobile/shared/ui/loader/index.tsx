import React, {FC} from 'react';
import {Text, View} from 'react-native';

type LoaderProps = {
  loading: boolean;
}

export const Loader: FC<LoaderProps> = ({loading}) => {

  return (
    <View>
      {loading && (<Text>Loading...</Text>)}
    </View>
  );
};

