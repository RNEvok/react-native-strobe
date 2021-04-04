import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CloseButton from './assets/close';

export type CloseProps = {
    closeStrobe: () => void
};

const Close: React.FC<CloseProps> = (props) => {
    const { closeStrobe } = props;

    return (
        <TouchableOpacity onPress={closeStrobe} style={s?.container}>
            <CloseButton />
        </TouchableOpacity>
    );
};

Close.defaultProps = {}

const s =
    StyleSheet.create({
        container: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,
            elevation: 13,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center"
        }
    });

const MemorizedComponent = memo(Close);
export { MemorizedComponent as Close };