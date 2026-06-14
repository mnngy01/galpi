// ShareScreen.tsx
import ShareMenu from 'react-native-share-menu';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ShareScreen() {
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);

  const handleShare = (item: any) => {
    if (!item || !item.data) return;
    setSharedUrl(item.data);
  };

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);

    const listener = ShareMenu.addNewShareListener(handleShare);
    return () => listener.remove();
  }, []);

  return (
    <View>
      <Text>{sharedUrl}</Text>
    </View>
  );
}
