export const CommonStyles = {
    displayFlex: {
        display: 'flex'
    },
    dislayInlineFlex: {
        display: 'inline-flex'
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    flexDirectionColumn: {
        flexDirection: 'column'
    },
    flexAlignCenter: {
        alignItems: 'center'
    },
    flexJustifyCenter: {
        justifyContent: 'center'
    },
    margin: (pixels: string | number = 15) => ({ margin: pixels }),
    marginTop: (pixels: string | number = 15) => ({ marginTop: pixels }),
    marginBottom: (pixels: string | number = 15) => ({ marginBottom: pixels }),
    marginLeft: (pixels: string | number = 15) => ({ marginLeft: pixels }),
    marginRight: (pixels: string | number = 15) => ({ marginRight: pixels })
};
