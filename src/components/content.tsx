import {resource, ResourceItem} from "src/server";
import {Box, HStack, VStack, Text, Image, useToast, Link} from "@chakra-ui/react";
import ResourcePanel from "./resourcePanel";
import {RounderBox, H2} from "src/components/primitives"
import React, {useEffect, useState} from "react";
import {myCollectionTableName, getDb, isSupportIndexDB} from "src/util/indexDB";
// import AddResourceDrawer from "./addResourceDrawer";

export const MyCollectionContext = React.createContext<{
    setMyCollection: React.Dispatch<React.SetStateAction<ResourceItem[]>>
}>({
    setMyCollection: () => { }
});

const Content = () => {
    const [myCollection, setMyCollection] = useState<ResourceItem[]>([]);
    const [addResourceModalOpen, setAddResourceModalOpen] = useState<boolean>(false);
    const toast = useToast();

    const updateMyCollection = () => {
        if (isSupportIndexDB()) {
            getDb().then((db) => {
                db.readAll(myCollectionTableName).then((res => {
                    if (res) {
                        setMyCollection(res as ResourceItem[]);
                    }
                }));
            });
        }
    };

    useEffect(() => {
        updateMyCollection();
    }, []);

    const my = {
        name: "我的",
        site: myCollection,
        icon: ""
    };
    return (
        <MyCollectionContext.Provider value={{setMyCollection}}>
            <VStack
                bgColor="var(--main-bg-color)"
                alignItems="stretch"
                rowGap="30px"
                display="inline-flex"
                pos="relative"
            >
                {
                    resource.map((item) => (<ResourcePanel key={item.name} myCollection={myCollection} resource={item} hasDeleteBtn={false} hasCollectBtn />))
                }
                <VStack
                    height="calc(100vh - 250px)"
                >
                    <Box flexGrow={1} alignSelf="stretch" pt="100px">
                        <H2 fontSize="16px" mb="15px">关于</H2>
                        <VStack alignItems="flex-start" fontSize="16px">
                            <Text>
                                ikushare
                                {/* Castaila 是一个资源导航网站，精选国内外优质网站，
                                让每个人都能找到自己需要的资源。如果你有比较好的资源，可以通过下方地址提供给我们。 */}
                            </Text>
                            <Text>
                            ikushare站点旨在记录自己工作、学习和生活点滴的同时，跟广大网友分享优质的互联网资源、软件工具以及实用的互联网小技巧。
                            </Text>
                            {/* <Link
                                href="https://afterwork-design.github.io"
                            >
                                <Image
                                    src="./afterwork.png"
                                    m="15px 0"
                                />
                            </Link> */}
                            {/* <Text>
                                <b>我的</b>面板中所有内容都是存储在浏览器本地的，所以更换电脑或者浏览器，并不会同步数据。
                                你可以点击卡片右上角的复选框将你喜欢的网站添加至<b>我的</b>。
                            </Text> */}
                            <Text>
                                本站所有互联网资源均搜集与互联网，仅供学习和参考。博客文章内容版权归作者及来源网站所有，原创内容不得转载！
                                {/* <a className="linkColor" href="https://github.com/afterwork-design/castalia">castalia | github</a> */}
                            </Text>
                            <Text>
                                如果你有优质的资源推荐，请发送至邮箱即可
                                邮箱地址:2697533527@qq.com
{/*                                 <a className="linkColor" href="https://github.com/afterwork-design/castalia/issues?q=label%3A%E8%B5%84%E6%BA%90%E6%8E%A8%E8%8D%90+">github 上提交 issue</a> */}
                            </Text>
                        </VStack>
                    </Box>
                    <Text color="#999999" fontSize="16px">
                        <span>Copyright © 2021 iMyShare 保留所有权利 鄂ICP备2021015464号-4 </span>
                        {/* <a href="https://tangweijuan.com" target="_blank">Tang Weijuan</a>
                        <span> & Developed by </span>
                        <a href="https://pengfeixc.com" target="_blank">Wang Pengfei</a> */}
                    </Text>
                </VStack>
            </VStack>
            {/* <AddResourceDrawer open={addResourceModalOpen} close={() => setAddResourceModalOpen(false)} /> */}
        </MyCollectionContext.Provider>
    )
};

export default Content;
