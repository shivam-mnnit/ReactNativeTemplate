/**
 * Created by ihor_kucherenko on 6/28/17.
 */
import React, {Component} from "react";
import {BackHandler, FlatList, View, Button, TouchableOpacity, Text} from "react-native";
import {Container, Spinner, StyleProvider, Tabs} from "native-base";
import RepositoryListItem from "./RepositoryListItem";
import colors from "../resources/colors";
import * as actions from "../actions/action-types";
import material from "../native_theme/variables/material";
import {connect} from "react-redux";
import strings from "../resources/strings";
import getTheme from "../native_theme/components";
import styles from "../resources/styles";
import consts from "../const";

function renderLeft(state) {
    //  const { editing } = state.params || false;
    return (
        <Button
            title='lll'
            // onPress={() => state.params.handleEdit()}
        />
    );
}


export class RepositoriesList extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={() => {
                    console.log("props", navigation.state.params.authId + "  " + navigation.state.params.username +  " " + navigation.state.params.password)
                    navigation.state.params.dispatch({
                        type: actions.LOGOUT_ACTION,
                        authId: navigation.state.params.authId,
                        username: navigation.state.params.username,
                        password: navigation.state.params.password})
                }}>
                    <Text style={repositoriesListStyles.logOutTextStyle}>{strings.logout}</Text>
                </TouchableOpacity>
            ),
            title: strings.list_title,
            headerLeft: null,
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            headerStyle: {
                backgroundColor: colors.primaryColor
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        }
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <RepositoryListItem
            id={item.id}
            title={item.full_name}
            description={item.description}
            navigation={this.props.navigation}
        />
    );

    componentDidUpdate() {
        const {list} = this.props;
        const {listError} = list;

        const {navigation, login} = this.props;
        const {isLoggedIn} = login;
        if (!isLoggedIn && !this.isGoneAlready) {
            navigation.navigate("Login")
            this.isGoneAlready = true;
        }

        if (listError && listError.message) {
            Toast.showShortBottom(this.props.login.loginError.message);
            this.props.dispatch({type: actions.ACTION_LIST_ERROR, error: {}})
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
        this.props.dispatch({
            type: actions.ACTION_REPOSITORIES_LIST,
            token: this.props.login.token,
            page: 1,
            limit: consts.BASE_PAGE_LIMIT
        });
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container
                    shouldRasterizeIOS
                    renderToHardwareTextureAndroid
                    style={repositoriesListStyles.screenStyle}>
                    <Tabs >
                        <FlatList
                            style={repositoriesListStyles.flatListStyle}
                            data={this.props.list.data}
                            heading={'Tab1'}
                            onEndReachedThreshold={0.01}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            onEndReached={() => this.dispatchGetRepos() }
                            ItemSeparatorComponent={() => <View style={repositoriesListStyles.itemSeparatorStyle}/>}
                        />

                        <FlatList
                            style={repositoriesListStyles.flatListStyle}
                            data={this.props.list.data}
                            heading={'Tab2'}
                            onEndReachedThreshold={0.01}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            onEndReached={() => this.dispatchGetRepos()}
                            ItemSeparatorComponent={() => <View style={repositoriesListStyles.itemSeparatorStyle}/>}
                        />
                        <FlatList
                            style={repositoriesListStyles.flatListStyle}
                            data={this.props.list.data}
                            heading={'Tab3'}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            onEndReachedThreshold={0.01}
                            onEndReached={() => this.dispatchGetRepos()}
                            ItemSeparatorComponent={() => <View style={repositoriesListStyles.itemSeparatorStyle}/>}
                        />
                    </Tabs>
                    {this.renderProgress()}
                </Container>
            </StyleProvider>)
    }

    renderProgress() {
        if (this.props.root.progress) {
            return ( <Spinner
                color={colors.accentColor}
                animating={true}
                size={'large'}
                style={styles.progressStyle}/>)
        } else {
            return null;
        }
    }

    dispatchGetRepos() {
        this.props.dispatch({
            type: actions.ACTION_REPOSITORIES_LIST,
            token: this.props.login.token,
            page: this.getNextPage(),
            limit: consts.BASE_PAGE_LIMIT,
        })
    }

    getNextPage() {
        return Math.round(this.props.list.data.length / consts.BASE_PAGE_LIMIT) + 1
    }
}

const repositoriesListStyles = {
    flatListStyle: {},
    screenStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.primaryColor
    },
    itemSeparatorStyle: {
        flex: 1,
        height: 1,
        backgroundColor: 'grey',
    },
    logOutTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 16
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        list: state.list,
        root: state.root
    }
}
export default connect(mapStateToProps)(RepositoriesList)